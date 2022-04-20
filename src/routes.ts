import { RegisterAgentesController } from '@usecases/AgentesUseCases/Register';
import { Router } from 'express';

const router = Router();

router.get('/', (request, response) => response.json({ message: 'services-agente-parceiro-magalu' }));

router.post('/users', RegisterAgentesController.Save);
router.put('/users', RegisterAgentesController.Save);
router.delete('/users', RegisterAgentesController.Delete);
router.get('/users', RegisterAgentesController.Get);
router.get('/users/:id', RegisterAgentesController.Get);

export { router };
