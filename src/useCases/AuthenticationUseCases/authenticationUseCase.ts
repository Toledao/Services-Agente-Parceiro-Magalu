import { IAuthenticationDTO, IAuthenticationResponseDTO } from './authenticationDTO';
import { compare } from 'bcryptjs';
import { GenerateToken } from '@providers/implementations/GenerateToken';
import { GenerateRefreshToken } from '@providers/implementations/GenerateRefreshToken';
import { PrismaClient } from '@repositories/PrismaClient';

export class AuthenticationUseCase {

	constructor(
		private prismaClient = PrismaClient,
		private tokenProvider: GenerateToken,
		private refreshTokenProvider: GenerateRefreshToken
	) {}
	
	async execute({email, senha}:IAuthenticationDTO){
		
		const { id, ehAdm, nome } = await this.ObterUsuario(email, senha);
		
		const token = await this.tokenProvider.execute(id, ehAdm, nome);

		const refreshToken = await this.refreshTokenProvider.execute(id, ehAdm, nome);

		return <IAuthenticationResponseDTO>{ token, refreshToken};
	}

	private async ObterUsuario(email: string, _senha: string){
		const { id, senha, nome } = await this.prismaClient.agente.findFirst({
			where: {
				email
			}
		});

		if (!id){
			throw new Error('Usuário ou senha incorretos.');
		}
        
		const ehAdm = false;
		
		const passwordMatch = await compare(_senha, senha);
        
		if(!passwordMatch){
			throw new Error('Usuário ou senha incorretos.');
		}
		
		return { id, senha, email, ehAdm, nome };
	}
    
}