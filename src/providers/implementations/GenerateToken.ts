import { Env } from '@config/environment';
import { sign } from 'jsonwebtoken';


export class GenerateToken{
	async execute(userId: string, ehAdm = false, nome: string){
		const token = sign({
			adm: ehAdm,
			nome: nome
		}, 
		Env.SECRETTOKEN,
		{ 
			subject: userId,
			expiresIn: Env.EXPIRESIN
		});
		return token;
	}
}