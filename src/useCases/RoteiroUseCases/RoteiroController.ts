import { Request, Response } from 'express';
import { RoteiroDeleteUseCase } from './RoteiroDeleteUseCase';
import { RoteiroSaveUseCase } from './RoteiroSaveUseCase';
import { IRoteiroQueryRequestDTO, IRoteiroSaveRequestDTO } from './RoteiroDTO';
import { RoteiroGetUseCase } from './RoteiroGetUseCase';
import moment from 'moment';

export class RoteirosController {

	constructor(
		private saveRoteiroUseCase: RoteiroSaveUseCase,
		private getRoteiroUseCase: RoteiroGetUseCase,
		private deleteRoteiroUseCase: RoteiroDeleteUseCase,
	) { }

	async GetAll(request: Request, response: Response): Promise<Response> {
		try {
			const { id, dataVisita, dataCriacao, tipoVisita, parceiroId, agenteId } = request.query;

			const roteiros = await this.getRoteiroUseCase.execute(<IRoteiroQueryRequestDTO>{ id, dataVisita, dataCriacao, tipoVisita, parceiroId, agenteId });
			if (roteiros.length > 0)
				return response.status(200).send(roteiros);
			return response.status(204).send([]);

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}

	async Get(request: Request, response: Response): Promise<Response> {

		const { dataVisita, dataCriacao, tipoVisita, parceiroId, agenteId } = request.body;
		const { id } = request.params;

		try {
			const roteiros = await this.getRoteiroUseCase.execute({ id, dataVisita, dataCriacao, tipoVisita, parceiroId, agenteId });
			if (roteiros?.length > 0)
				return response.status(200).send(roteiros);
			return response.status(204).send([]);

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}

	async Save(request: Request, response: Response): Promise<Response> {

		const { data } = request.body;

		const reqbody = <IRoteiroSaveRequestDTO[]>[...data];

		try {

			const roteiro = await this.saveRoteiroUseCase.execute(reqbody);

			return response.status(201).send(roteiro);

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}

	async Delete(request: Request, response: Response): Promise<Response> {

		const { id } = request.body;

		try {
			if (!await this.deleteRoteiroUseCase.execute(id)) {
				throw new Error('Não foi possível excluir o roteiro.');
			}

			return response.status(200).send({ message: 'Roteiro excluído com sucesso' });

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}
}