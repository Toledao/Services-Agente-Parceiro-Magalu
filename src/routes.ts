import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { RegisterAgentesController } from '@usecases/AgentesUseCases/Register';
import { RegisterAuthenticationController } from '@usecases/AuthenticationUseCases/register';
import { RegisterParceiroController } from '@usecases/ParceiroUseCases/Register';
import { RegisterRedefinirSenhaController } from '@usecases/RedefinirSenhaUseCases/register';
import { RegisterRefreshTokenController } from '@usecases/refreshTokenUser/register';
import { Request, Response, Router } from 'express';
import multer from 'multer';

const multerConfig = multer();

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
router.post('/Login/EsqueciASenha/EnviarEmail', async (request: Request, response: Response) => await RegisterRedefinirSenhaController.enviarCodigoEmail(request, response));
router.post('/Login/EsqueciASenha/Codigo', async (request: Request, response: Response) => await RegisterRedefinirSenhaController.authCodigo(request, response));
router.post('/Login/EsqueciASenha', async (request: Request, response: Response) => await RegisterRedefinirSenhaController.redefinir(request, response));
//#endregion

//#region Parceiros
router.get('/Parceiro/:id', ensureAuthenticated, async (request: Request, response: Response) => await RegisterParceiroController.Get(request, response));
router.get('/Parceiro', ensureAuthenticated, async (request: Request, response: Response) => await RegisterParceiroController.GetAll(request, response));
router.put('/Parceiro', ensureAuthenticated, async (request: Request, response: Response) => await RegisterParceiroController.Save(request, response));
router.post('/Parceiro', ensureAuthenticated, async (request: Request, response: Response) => await RegisterParceiroController.Save(request, response));
router.post('/Parceiro/Import', ensureAuthenticated, multerConfig.single('file'), async (request: Request, response: Response) => await RegisterParceiroController.SaveImport(request, response));
router.delete('/Parceiro', ensureAuthenticated, async (request: Request, response: Response) => await RegisterParceiroController.Delete(request, response));
//#endregion


export { router };
