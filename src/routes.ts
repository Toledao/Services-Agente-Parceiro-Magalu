import { RegisterAgentesController } from '@usecases/AgentesUseCases/Register';
import { RegisterAuthenticationController } from '@usecases/AuthenticationUseCases/register';
import { RegisterRefreshTokenController } from '@usecases/refreshTokenUser/register';
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

//#region Authentication
router.post('/Login',async (request: Request, response: Response) => await RegisterAuthenticationController.handle(request, response));
//#endregion

//#region RefreshToken
router.post('/Login/RefreshToken',async (request: Request, response: Response) => await RegisterRefreshTokenController.handle(request, response));
//#endregion

export { router };
