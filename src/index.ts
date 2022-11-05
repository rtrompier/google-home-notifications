import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Notifier } from './notifier';

dotenv.config();

const app: Express = express();
const port = process.env.GHN_PORT || 3000;
const notifier = new Notifier();

app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'OK' });
});

app.get('/notify', (req: Request, res: Response) => {
    notifier.handler(req).subscribe({
        complete : () => res.status(202).send(),
        error:  (err) => res.status(500).json({error: err})
    });
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});