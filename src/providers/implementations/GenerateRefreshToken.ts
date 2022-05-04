import { sign } from 'jsonwebtoken';
import { Env } from '@config/environment';

export class GenerateRefreshToken {

	async execute(userId: string, ehAdm = false, nome: string){

		const generateRefreshToken = sign({
			adm: ehAdm,
			nome: nome
		}, 
		Env.SECRETTOKEN,
		{ 
			subject: userId,
			expiresIn: 1800
		});
		return generateRefreshToken;
	}
}
