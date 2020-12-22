import { Request, Response, NextFunction } from 'express';

export function handleErrors(
    fn: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void | Promise<void>
) {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            return await fn(req, res, next);
        } catch (x) {
            return next(x);
        }
    };
}

export async function waitForWebpack(): Promise<void> {
    const { readFileSync } = await import('fs');
    const { resolve } = await import('path');

    // eslint-disable-next-line
    while (true) {
        try {
            readFileSync(resolve(__dirname, '../build/index.html'));
            return;
        } catch (err) {
            console.log(
                'Could not find webpack build output. Will retry in a second...'
            );
            // eslint-disable-next-line
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }
}

export async function renderReactTree(
    res: Response,
    props: Record<string, unknown>
): Promise<void> {
    const { readFileSync } = await import('fs');
    const { resolve } = await import('path');
    const { createElement } = await import('react');
    const { pipeToNodeWritable } = await import(
        // @ts-ignore - No types yet
        'react-server-dom-webpack/writer'
    );

    const ReactApp = (await import('../../client/src/server/App')).default;

    await waitForWebpack();
    const manifest = readFileSync(
        resolve(__dirname, '../build/react-client-manifest.json'),
        'utf8'
    );
    const moduleMap = JSON.parse(manifest);
    pipeToNodeWritable(createElement(ReactApp, props), res, moduleMap);
}

export function sendResponse(
    req: Request,
    res: Response,
    redirectToId: null
): void {
    const location = JSON.parse(req.query.location as string);
    if (redirectToId) {
        location.selectedId = redirectToId;
    }
    res.set('X-Location', JSON.stringify(location));
    renderReactTree(res, {
        selectedId: location.selectedId,
        isEditing: location.isEditing,
        searchText: location.searchText,
    });
}
