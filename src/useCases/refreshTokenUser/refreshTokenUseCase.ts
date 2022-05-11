import { Env } from '@config/environment';
import { GenerateRefreshToken } from '@providers/implementations/GenerateRefreshToken';
import { GenerateToken } from '@providers/implementations/GenerateToken';
import { PrismaClient } from '@repositories/PrismaClient';
import { verify, decode } from 'jsonwebtoken';
import moment from 'moment';
import { IRefreshTokenRequestDTO, IRefreshTokenResponseDTO } from './refreshTokenDTO';

export class RefreshTokenUseCase{

	constructor(
		private client = PrismaClient,
		private generateTokenProvider: GenerateToken,
		private generateRefreshToken: GenerateRefreshToken
	) { }
	

	async execute({ refreshToken }: IRefreshTokenRequestDTO){
		// const decoded = verify(refreshToken, Env.SECRETTOKEN);
		const decoded = decode(refreshToken);
		const sub = decoded?.sub?.toString();
		
		if(!sub){
			throw new Error('Invalid Refresh Token.');
		}
		
		const {id, ehadm, nome} = await this.ObterUsuario(sub)

		if(!id){
			throw new Error('Invalid Refresh Token.');
		}
		
		const token = await this.generateTokenProvider.execute(sub, ehadm, nome);
        
		const expiresIn = decoded?.exp;
		const refreshTokenExpired = moment().isAfter(moment.unix(expiresIn));
        
		if(refreshTokenExpired){
			const refreshToken = await this.generateRefreshToken.execute(sub, ehadm, nome);
			return <IRefreshTokenResponseDTO>{ token, refreshToken };
		}

		return <IRefreshTokenResponseDTO>{ token };
         
	}
	
	private async ObterUsuario(_id: string){
		const { id, nome } = await this.client.agente.findFirst({
			where: {
				id: _id
			}
		});

		const ehadm = false

		if (!id){
			throw new Error('Refresh token Invalid');
		}
        
		return { id, ehadm, nome };
	}
    
}