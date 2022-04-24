import { RegisterAgentesController } from '@usecases/AgentesUseCases/Register';
import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (request, response) => response.json({ message: 'services-agente-parceiro-magalu' }));

//#region AgentesUseCase
router.put('/Agente', async (request: Request, response: Response) => await RegisterAgentesController.Save(request, response));
router.post('/Agente', async (request: Request, response: Response) => await RegisterAgentesController.Save(request, response));
router.get('/Agente', async (request: Request, response: Response) => await RegisterAgentesController.GetAll(request, response));
router.get('/Agente/:id', async (request: Request, response: Response) => await RegisterAgentesController.Get(request, response));
router.delete('/Agente', async (request: Request, response: Response) => await RegisterAgentesController.Delete(request, response));
//#endregion

export { router };
