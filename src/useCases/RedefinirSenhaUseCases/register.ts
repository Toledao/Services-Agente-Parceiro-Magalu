import { Env } from '@config/environment';
import { IEmailProvider } from '@providers/IEmailProvider';
import { MailSendinBlue } from '@providers/implementations/MailSendinBlue';
import { MailTrapProvider } from '@providers/implementations/MailTrapProvider';
import { RedefinirSenhaController } from './redefinirSenhaController';
import { RedefinirSenhaUseCase } from './redefinirSenhaUseCase';

let emailProvider: IEmailProvider;

if (Env.ENVIRONMENT.toLocaleLowerCase() === 'dev') {
	emailProvider = new MailTrapProvider();
}
else {
	emailProvider = new MailSendinBlue();
}

const redefinirSenhaUseCase = new RedefinirSenhaUseCase(emailProvider);
const redefinirSenhaController = new RedefinirSenhaController(redefinirSenhaUseCase);

export { redefinirSenhaController as RegisterRedefinirSenhaController };