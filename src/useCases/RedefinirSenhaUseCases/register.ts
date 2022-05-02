import { Env } from '@config/environment';
import { IEmailProvider } from '@providers/IEmailProvider';
import { MailSendinBlue } from '@providers/implementations/MailSendinBlue';
import { MailTrapProvider } from '@providers/implementations/MailTrapProvider';
import { AgentesRepository } from '@repositories/implementations/agentesRepository';
import { RedefinirSenhaController } from './redefinirSenhaController';
import { RedefinirSenhaUseCase } from './redefinirSenhaUseCase';

let emailProvider: IEmailProvider;

if (Env.ENVIRONMENT.toLocaleLowerCase() === 'dev') {
	emailProvider = new MailTrapProvider();
}
else {
	emailProvider = new MailSendinBlue();
}


const agenteRepo = new AgentesRepository();
const redefinirSenhaUseCase = new RedefinirSenhaUseCase(emailProvider, agenteRepo);
const redefinirSenhaController = new RedefinirSenhaController(redefinirSenhaUseCase);

export { redefinirSenhaController as RegisterRedefinirSenhaController };