import { Env } from '@config/environment';
import { sign } from 'jsonwebtoken';


export class GenerateToken{
	async execute(userId: string, ehAdm = false){
		const token = sign({
			adm: ehAdm
		}, 
		Env.SECRETTOKEN,
		{ 
			subject: userId,
			expiresIn: Env.EXPIRESIN
		});
		return token;
	}
}