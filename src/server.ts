import express, { application } from 'express';
import { router } from './routes';

const app = express();

app.routes(router);

app.listen(3333);