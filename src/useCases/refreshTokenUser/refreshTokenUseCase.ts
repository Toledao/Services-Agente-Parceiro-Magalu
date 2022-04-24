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
		const id = decoded?.sub?.toString();
		
		if(!id){
			throw new Error('Invalid Refresh Token.');
		}
		
		if(!this.ObterUsuario(id)){
			throw new Error('Invalid Refresh Token.');
		}
		
		const token = await this.generateTokenProvider.execute(id);
        
		const expiresIn = decoded?.exp;
		const refreshTokenExpired = moment().isAfter(moment.unix(expiresIn));
        
		if(refreshTokenExpired){
			const refreshToken = await this.generateRefreshToken.execute(id);
			return <IRefreshTokenResponseDTO>{ token, refreshToken };
		}

		return <IRefreshTokenResponseDTO>{ token };
         
	}
	
	private async ObterUsuario(_id: string){
		const { id } = await this.client.agente.findFirst({
			where: {
				id: _id
			}
		});

		if (!id){
			throw new Error('Refresh token Invalid');
		}
        
		return { id };
	}
    
}