import moment from 'moment';

export const MailTemplateSolicitacao = function (codigo: string) {
	return `<html>

	<body style="font-family: Verdana, Geneva, Tahoma, sans-serif;">
		<h3 style="background-color: #0086FE;
		color: white;
		padding: 2rem;
		border-radius: 2rem 2rem 0 0;
		text-align: center;
		margin: 0;">APP Agente Parceiro - Magalu</h3>
		<div
			style="padding: 0.5rem;
		background-image: linear-gradient(to right, rgb(255, 255, 74) 0px, rgb(252, 208, 0) 4%, rgb(255, 193, 18) 8%, rgb(255, 193, 18) 11%, rgb(255, 138, 0) 16%, rgb(255, 95, 95) 22%, rgb(255, 37, 58) 28%, rgb(255, 55, 168) 37%, rgb(199, 57, 255) 49%, rgb(164, 0, 225) 56%, rgb(46, 206, 255) 72%, rgb(0, 134, 255) 80%, rgb(114, 247, 114) 94%, rgb(0, 214, 4));">
		</div>
		<div style="text-align: center;
		font-size: 1rem;
		padding: 1rem 0;
		margin: 1rem 0;">
			<p>
				Olá! Foi solicitado a redefinição da sua senha.</br>
				Para prossseguir, utilize o código a seguir:
			</p>
			<p style="font-weight: bold;
			font-size: 2rem;">
				${codigo}
			</p>
		</div>
		<div style="background-color: #0086FE;
		color: white;
		padding: 0.5rem;
		border-radius: 0 0 2rem 2rem;
		text-align: center;
		font-size: 0.8rem;">
			<p>app agente parceiro magalu © 2022</p>
		</div>
	</body>
	
	</html>`;
};

export const MailTemplateAlteradoComSucesso = function () {
	return `<html>

	<body style="font-family: Verdana, Geneva, Tahoma, sans-serif;">
		<h3 style="background-color: #0086FE;
		color: white;
		padding: 2rem;
		border-radius: 2rem 2rem 0 0;
		text-align: center;
		margin: 0;">APP Agente Parceiro - Magalu</h3>
		<div
			style="padding: 0.5rem;
		background-image: linear-gradient(to right, rgb(255, 255, 74) 0px, rgb(252, 208, 0) 4%, rgb(255, 193, 18) 8%, rgb(255, 193, 18) 11%, rgb(255, 138, 0) 16%, rgb(255, 95, 95) 22%, rgb(255, 37, 58) 28%, rgb(255, 55, 168) 37%, rgb(199, 57, 255) 49%, rgb(164, 0, 225) 56%, rgb(46, 206, 255) 72%, rgb(0, 134, 255) 80%, rgb(114, 247, 114) 94%, rgb(0, 214, 4));">
		</div>
		<div style="text-align: center;
		font-size: 1rem;
		padding: 1rem 0;
		margin: 1rem 0;">
			<p>
				Olá! Sua senha foi redefinida com sucesso.</br>
				Redefinição realizada em: ${moment().locale('pt-br').format('LLLL')}.
			</p>
		</div>
		<div style="background-color: #0086FE;
		color: white;
		padding: 0.5rem;
		border-radius: 0 0 2rem 2rem;
		text-align: center;
		font-size: 0.8rem;">
			<p>app agente parceiro magalu © 2022</p>
		</div>
	</body>
	
	</html>`;
};
