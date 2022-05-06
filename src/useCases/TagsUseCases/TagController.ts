import { Request, Response } from 'express';
import { TagDeleteUseCase } from './TagDeleteUseCase';
import { TagSaveUseCase } from './TagSaveUseCase';
import { ITagQueryRequestDTO } from './TagDTO';
import { TagGetUseCase } from './TagGetUseCase';

export class TagsController {

	constructor(
		private saveTagUseCase: TagSaveUseCase,
		private getTagUseCase: TagGetUseCase,
		private deleteTagUseCase: TagDeleteUseCase,
	) { }

	async GetAll(request: Request, response: Response): Promise<Response> {
		try {
			const { id, nome, cor, exibePadrao, agenteId } = request.query;

			const tags = await this.getTagUseCase.execute(<ITagQueryRequestDTO>{ id, nome, cor, exibePadrao, agenteId });
			if (tags.length > 0)
				return response.status(200).send(tags);
			return response.status(204).send([]);

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}

	async Get(request: Request, response: Response): Promise<Response> {

		const { nome, cor, exibePadrao, agenteId } = request.body;
		const { id } = request.params;

		try {
			const tags = await this.getTagUseCase.execute({ id, nome, cor, exibePadrao, agenteId });
			if (tags?.length > 0)
				return response.status(200).send(tags);
			return response.status(204).send([]);

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}

	async Save(request: Request, response: Response): Promise<Response> {

		const { id, nome, cor, agenteId } = request.body;

		try {

			const tag = await this.saveTagUseCase.execute({ id, nome, cor, agenteId });

			return response.status(201).send(tag);

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}

	async Delete(request: Request, response: Response): Promise<Response> {

		const { id } = request.body;

		try {
			if (!await this.deleteTagUseCase.execute(id)) {
				throw new Error('Não foi possível excluir o tag.');
			}

			return response.status(200).send({ message: 'Tag excluído com sucesso' });

		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.'
			});
		}
	}
}