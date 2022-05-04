import { Roteiro } from '@entities/roteiro';
import { Tag } from '@entities/tag';
import { IRoteirosRepository } from '@repositories/IRoteirosRepository';
import { ITagSaveRequestDTO, TagResponseDTO } from '@usecases/TagsUseCases/TagDTO';
import { TagsRoteiroUseCase } from '@usecases/TagsUseCases/TagsRoteiroUseCase';
import moment from 'moment';
import { IRoteiroResponseDTO, IRoteiroSaveRequestDTO, RoteiroResponseDTO } from './RoteiroDTO';


export class RoteiroSaveUseCase {

	constructor(
		private readonly roteirosRepository: IRoteirosRepository,
		private tagRoteiroUseCase: TagsRoteiroUseCase
	) { }


	async execute(data: IRoteiroSaveRequestDTO[]): Promise<IRoteiroResponseDTO[]> {

		const retorno: RoteiroResponseDTO[] = [];

		for (const visita of data) {

			const { tags, ...itemVisita } = visita;

			const _dataVisita = itemVisita.dataVisita != undefined ? moment(itemVisita.dataVisita, 'YYYY-MM-DD hh:mm:ss').toDate() : undefined;
			const _dataCriacao = itemVisita?.id != undefined && itemVisita?.id != null ? undefined : moment().toDate();
			const itemRoteiro = new Roteiro(
				{
					...itemVisita,
					dataVisita: _dataVisita,
					dataCriacao: _dataCriacao
				}, itemVisita?.id);

			if (!itemVisita?.id) {
				const _roteiro = new RoteiroResponseDTO(await this.roteirosRepository.create(itemRoteiro));

				_roteiro.tags = (await this.salvarTag(tags, itemRoteiro.id)).map(x => new TagResponseDTO(x));

				retorno.push(_roteiro);

				continue;
			}

			const visitaExistente = await this.roteirosRepository.getById(itemVisita.id);
			if (moment().isAfter(visitaExistente.dataVisita)) {

				//melhorar o print de information
				new Error('Não é possivel alterar a visita com horário passado.');
				continue;
			}

			const _roteiro = new RoteiroResponseDTO(await this.roteirosRepository.update(itemRoteiro));

			await this.deleteTag(tags, _roteiro.id);
			_roteiro.tags = (await this.salvarTag(tags, itemRoteiro.id)).map(x => new TagResponseDTO(x));

			retorno.push(_roteiro);

			await this.salvarTag(tags, itemRoteiro.id);
		}

		return retorno;
	}

	private async salvarTag(tags: ITagSaveRequestDTO[], roteiroId: string) {
		const _tags: Tag[] = [];
		for (const tag of tags) {
			_tags.push(await this.tagRoteiroUseCase.handleSave({ tagId: tag.id, roteiroId }));
		}
		return _tags;
	}

	private async deleteTag(tags: ITagSaveRequestDTO[], roteiroId: string) {
		if (tags?.length > 0) {

			const allTags = await this.tagRoteiroUseCase.handleGetAllTags(roteiroId);
			const tagsNotInPayload = allTags.filter(x => tags.map(y => y.id).includes(x.id) === false);

			for (const tag of tagsNotInPayload) {
				await this.tagRoteiroUseCase.handleDelete({ tagId: tag.id, roteiroId });
			}
		}
	}
}