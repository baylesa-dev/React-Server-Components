import { readFileSync } from 'fs';
import { resolve } from 'path';

import compress from 'compression';
import express, { Request, Response } from 'express';
// @ts-ignore - not typed yet
import register from 'react-server-dom-webpack/node-register';

import { handleErrors, sendResponse, waitForWebpack } from './utils';

register();

const PORT = process.env.PORT || 4000;

async function main() {
    const app = express();

    app.use(compress());
    app.use(express.json());
    app.use(express.static(resolve(__dirname, '../../../build')));

    app.get(
        '/',
        handleErrors(async (_req: Request, res: Response) => {
            await waitForWebpack();
            const html = readFileSync(
                resolve(__dirname, '../../../build/index.html'),
                'utf8'
            );
            res.send(html);
        })
    );

    app.get('/react', (req, res) => {
        sendResponse(req, res);
    });

    app.listen(PORT, () => {
        console.log(`Server listening at ${PORT}...`);
    });
}

main();
