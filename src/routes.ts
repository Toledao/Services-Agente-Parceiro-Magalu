import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { RegisterAgentesController } from '@usecases/AgentesUseCases/Register';
import { RegisterAuthenticationController } from '@usecases/AuthenticationUseCases/register';
import { RegisterRedefinirSenhaController } from '@usecases/RedefinirSenhaUseCases/Register';
import { RegisterRefreshTokenController } from '@usecases/refreshTokenUser/register';
import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (request, response) => response.json({ message: 'services-agente-parceiro-magalu' }));

//#region AgentesUseCase
router.put('/Agente', ensureAuthenticated, async (request: Request, response: Response) => await RegisterAgentesController.Save(request, response));
router.post('/Agente', ensureAuthenticated, async (request: Request, response: Response) => await RegisterAgentesController.Save(request, response));
router.get('/Agente', ensureAuthenticated, async (request: Request, response: Response) => await RegisterAgentesController.GetAll(request, response));
router.get('/Agente/:id', ensureAuthenticated, async (request: Request, response: Response) => await RegisterAgentesController.Get(request, response));
router.delete('/Agente', ensureAuthenticated, async (request: Request, response: Response) => await RegisterAgentesController.Delete(request, response));
//#endregion

//#region Authentication
router.post('/Login', async (request: Request, response: Response) => await RegisterAuthenticationController.handle(request, response));
//#endregion

//#region RefreshToken
router.post('/Login/RefreshToken', async (request: Request, response: Response) => await RegisterRefreshTokenController.handle(request, response));
//#endregion

//#region EsqueciASenha
router.post('/Login/EsqueciASenha', async (request: Request, response: Response) => await RegisterRedefinirSenhaController.enviarEmail(request, response));
router.post('/Login/EsqueciASenha/Codigo', async (request: Request, response: Response) => await RegisterRedefinirSenhaController.authCodigo(request, response));
//#endregion


export { router };
