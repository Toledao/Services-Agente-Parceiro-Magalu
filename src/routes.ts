import { RegisterAgentesController } from '@usecases/AgentesUseCases/Register';
import { Router } from 'express';

const router = Router();

router.get('/', (request, response) => response.json({ message: 'services-agente-parceiro-magalu' }));

router.post('/Agente', RegisterAgentesController.Save);
router.put('/Agente', RegisterAgentesController.Save);
router.delete('/Agente', RegisterAgentesController.Delete);
router.get('/Agente', RegisterAgentesController.Get);
router.get('/Agente/:id', RegisterAgentesController.Get);

export { router };
