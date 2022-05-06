import { Request, Response } from 'express';
import { CheckListDeleteUseCase } from './CheckListDeleteUseCase';
import { ICheckListQueryRequestDTO, ICheckListSaveRequestDTO } from './CheckListDTO';
import { CheckListGetUseCase } from './CheckListGetUseCase';
import { CheckListSaveUseCase } from './CheckListSaveUseCase';

export class CheckListsController {

	constructor(
		private saveCheckListUseCase: CheckListSaveUseCase,
		private getCheckListUseCase: CheckListGetUseCase,
		private deleteCheckListUseCase: CheckListDeleteUseCase
	) { }

	async GetAll(request: Request, response: Response): Promise<Response> {
		try {
			const { id, preferenciaContato, redesSociaisAtivas, canaisVendaOnline, qtdeSku, pussuiErpHub, tipoLogistica, percepcaoGeral, imagens, dataPrimeiraVisita, agenteId, parceiroId } = request.query;

			const checkLists = await this.getCheckListUseCase.execute(<ICheckListQueryRequestDTO>{ id, preferenciaContato, redesSociaisAtivas, canaisVendaOnline, qtdeSku, pussuiErpHub, tipoLogistica, percepcaoGeral, imagens, dataPrimeiraVisita, agenteId, parceiroId });
			if (checkLists.length > 0)
				return response.status(200).send(checkLists);
			return response.status(204).send([]);

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}

	async Get(request: Request, response: Response): Promise<Response> {

		const { preferenciaContato, redesSociaisAtivas, canaisVendaOnline, qtdeSku, pussuiErpHub, tipoLogistica, percepcaoGeral, imagens, dataPrimeiraVisita, agenteId, parceiroId } = request.body;
		const { id } = request.params;

		try {
			const checkLists = await this.getCheckListUseCase.execute({ id, preferenciaContato, redesSociaisAtivas, canaisVendaOnline, qtdeSku, pussuiErpHub, tipoLogistica, percepcaoGeral, imagens, dataPrimeiraVisita, agenteId, parceiroId });
			if (checkLists?.length > 0)
				return response.status(200).send(checkLists);
			return response.status(204).send([]);

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}

	async Save(request: Request, response: Response): Promise<Response> {

		const { data } = request.body;

		const reqbody = <ICheckListSaveRequestDTO[]>[...data];

		try {

			const checkList = await this.saveCheckListUseCase.execute(reqbody);

			return response.status(201).send(checkList);

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}

	async Delete(request: Request, response: Response): Promise<Response> {

		const { id } = request.body;

		try {
			if (!await this.deleteCheckListUseCase.execute(id)) {
				throw new Error('Não foi possível excluir o checkList.');
			}

			return response.status(200).send({ message: 'CheckList excluído com sucesso' });

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}
}