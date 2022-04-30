import { Env } from '@config/environment';
import { IEmailProvider, IMessage } from '@providers/IEmailProvider';
import SibApiV3Sdk from 'sib-api-v3-sdk';


export class MailSendinBlue implements IEmailProvider {

	private provider;

	constructor() {
		SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = Env.SENDINBLUE_APIKEY;
		this.provider = new SibApiV3Sdk.TransactionalEmailsApi();
	}

	async sendEmail({ body, from, subject, to }: IMessage) {

		this.provider.sendTransacEmail(this.format({ body, from, subject, to }))
			.then(
				(data) => console.log(data),
				(error) => console.error(error)
			);

	}

	private format({ body, from, subject, to }: IMessage) {
		return {

			'sender': { 'email': from.email || Env.EMAIL, 'name': from.name || Env.NAME },
			'subject': subject,
			'htmlContent': body || '<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>',
			'params': {
				'greeting': 'This is the default greeting',
				'headline': 'This is the default headline'
			},
			'to': [
				{
					'email': to.email,
					'name': to.name
				}
			],
		};
	}

}


