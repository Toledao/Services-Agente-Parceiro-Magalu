import { Env } from '@config/environment';
import { IEmailProvider, IMessage } from '@providers/IEmailProvider';
import { IAuthCodigoRequestDTO, IEnviarEmailRequestDTO, IRedefinirSenhaRequestDTO } from './redefinirSenhaDTO';
import { MailTemplateAlteradoComSucesso, MailTemplateSolicitacao } from './MailTemplates';
import { PrismaClient } from '@repositories/PrismaClient';
import { hash } from 'bcryptjs';
import { AgentesRepository } from '@repositories/implementations/agentesRepository';


export class RedefinirSenhaUseCase {

	private codigos: IAuthCodigoRequestDTO[];

	constructor(
		private readonly emailProvider: IEmailProvider,
		private readonly agenteRepo: AgentesRepository,
		private readonly client = PrismaClient
	) { }

	public async enviarEmail({ email }: IEnviarEmailRequestDTO) {

		const agente = await this.agenteRepo.findByEmail(email);

		if (agente === undefined || agente === null)
			throw new Error('email/usuario incorretos.');

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

	public async redefinirSenha({ senha, email }: IRedefinirSenhaRequestDTO) {

		try {

			const pass = await hash(senha, 8);

			await this.client.agente.update({
				where: {
					email
				},
				data: {
					senha: pass
				}
			});

			const message = MailTemplateAlteradoComSucesso();

			this.emailProvider.sendEmail(<IMessage>{
				to: {
					email,
					name: email.split('@')[0]
				},
				from: {
					email: Env.EMAIL,
					name: Env.NAME
				},
				subject: 'Agente Parceiro - Senha Redefinida',
				body: message
			}
			);

			return true;
		}
		catch (error) {
			return false;
		}
	}

	private obterCodigo() {
		const length = 6;
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
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