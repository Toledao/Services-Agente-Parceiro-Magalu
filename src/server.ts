import { Env } from '@config/environment';
import { ErrorHandling } from '@middlewares/errorHandling';
import express, { json } from 'express';
import { router } from './routes';

const app = express();

app.use(json());

app.use(router);

app.use(ErrorHandling);

app.listen(Env.PORT, () => {
	if (!Env.PORT)
		throw new Error('Port is undefined.');
	console.log(`server runnig in ${Env.PORT}`);
});