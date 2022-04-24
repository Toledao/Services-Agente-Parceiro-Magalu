import { sign } from 'jsonwebtoken';
import { Env } from '@config/environment';

export class GenerateRefreshToken {

	async execute(userId: string, ehAdm = false){

		const generateRefreshToken = sign({
			adm: ehAdm
		}, 
		Env.SECRETTOKEN,
		{ 
			subject: userId,
			expiresIn: 120
		});
		return generateRefreshToken;
	}
}