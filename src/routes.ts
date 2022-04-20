import { Router } from 'express';
import { createUserController } from './useCases/createUser/Register';

const router = Router();

router.get('/', (request, response) => response.json({ message: 'services-agente-parceiro-magalu' }));

router.post('/users', async (request, response) => {
	return await createUserController.handle(request, response);
});

export { router };
