import { Env } from '@config/environment';
import { IEmailProvider, IMessage } from '@providers/IEmailProvider';
import { IAuthCodigoRequestDTO, IEnviarEmailRequestDTO } from './redefinirSenhaDTO';
import { MailTemplateSolicitacao } from './MailTemplates';


export class RedefinirSenhaUseCase {

	private codigos: IAuthCodigoRequestDTO[];

	constructor(
		private readonly emailProvider: IEmailProvider
	) { }

	public async enviarEmail({ email }: IEnviarEmailRequestDTO) {

		const codigo = this.obterCodigo();
		if (codigo.length > 0 === false)
			throw Error('Não foi possivel gerar o código.');

		const message = MailTemplateSolicitacao(codigo);

		this.emailProvider.sendEmail(<IMessage>{
			to: {
				email,
				name: email.split('@')[0]
			},
			from: {
				email: Env.EMAIL,
				name: Env.NAME
			},
			subject: 'Agente Parceiro - Redefinir Senha',
			body: message
		});

		if (this.codigos === undefined)
			this.codigos = Array<IAuthCodigoRequestDTO>();

		this.codigos.push({ codigo, email });

	}

	public async auth({ codigo, email }: IAuthCodigoRequestDTO) {

		return await this.CodigoExiste(codigo, email);

	}

	private obterCodigo() {
		const length = 6;
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length - i));
		}
		return result;
	}

	private async CodigoExiste(codigo: string, email: string) {
		const result = this.codigos?.findIndex(x => x.codigo.toUpperCase() === codigo.toUpperCase() && x.email === email);
		return result != undefined && result != -1;
	}
}