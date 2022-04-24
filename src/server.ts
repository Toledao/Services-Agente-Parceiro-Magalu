import { Env } from '@config/environment';
import { app } from './app';

app.listen(Env.PORT, () => {
	if (!Env.PORT)
		throw new Error('Port is undefined.');
	console.log(`server runnig in ${Env.PORT}`);
});