import { readFileSync } from 'fs';
import { resolve } from 'path';

import compress from 'compression';
import express, { Request, Response } from 'express';

import { handleErrors, sendResponse, waitForWebpack } from './utils';

const PORT = process.env.PORT || 4000;

async function main() {
    const app = express();

    app.use(compress());
    app.use(express.json());
    app.use(express.static('build'));
    app.use(express.static('public'));

    app.get(
        '/',
        handleErrors(async (_req: Request, res: Response) => {
            await waitForWebpack();
            const html = readFileSync(
                resolve(__dirname, '../build/index.html'),
                'utf8'
            );
            res.send(html);
        })
    );

    app.get('/react', (req, res) => {
        sendResponse(req, res, null);
    });

    app.listen(PORT, () => {
        console.log(`Server listening at ${PORT}...`);
    });
}

main();
