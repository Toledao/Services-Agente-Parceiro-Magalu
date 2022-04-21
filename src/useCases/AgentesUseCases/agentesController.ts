import { Request, Response } from 'express';
import { DeleteAgenteUseCase } from './DeleteAgenteUseCase';
import { GetAgenteUseCase } from './GetAgenteUseCase';
import { SaveAgenteUseCase } from './SaveAgenteUseCase';

export class AgentesController {

	constructor(
		private saveAgenteUseCase: SaveAgenteUseCase,
		private getAgenteUseCase: GetAgenteUseCase,
		private deleteAgenteUseCase: DeleteAgenteUseCase,
	) { }

	async GetAll(request: Request, response: Response): Promise<Response> {
		try {
			const agentes = await this.getAgenteUseCase.execute();
			if (agentes.length > 0)
				return response.status(200).send(agentes);
			return response.status(204).send([]);

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}

	async Get(request: Request, response: Response): Promise<Response> {

		const { nome, email, cpf, dataCriacao } = request.body;
		const { id } = request.params;

		try {
			const agentes = await this.getAgenteUseCase.execute({ id, nome, email, cpf, dataCriacao });
			if (agentes?.length > 0)
				return response.status(200).send(agentes);
			return response.status(204).send([]);

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}

	async Save(request: Request, response: Response): Promise<Response> {

		const { id, nome, email, senha, cpf } = request.body;

		try {
			const agente = await this.saveAgenteUseCase.execute({
				id,
				nome,
				email,
				senha,
				cpf
			});

			return response.status(201).send(agente);

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}

	async Delete(request: Request, response: Response): Promise<Response> {

		const { id } = request.body;

		try {
			if (!await this.deleteAgenteUseCase.execute(id)) {
				throw new Error('Não foi possível excluir o agente.');
			}

			return response.status(200).send({ message: 'Agente excluído com sucesso' });

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}
}