import moment from 'moment';
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
			expiresIn: moment().add(120,'s').unix()
		});
		return generateRefreshToken;
	}
}