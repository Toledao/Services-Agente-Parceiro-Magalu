import { CheckList } from '@entities/checklist';
import { Tag } from '@entities/tag';
import { ICheckListsRepository } from '@repositories/ICheckListsRepository';
import { ITagSaveRequestDTO, TagResponseDTO } from '@usecases/TagsUseCases/TagDTO';
// import { TagsCheckListUseCase } from '@usecases/TagsUseCases/TagsCheckListUseCase';
import moment from 'moment';
import { ICheckListResponseDTO, ICheckListSaveRequestDTO, CheckListResponseDTO } from './CheckListDTO';


export class CheckListSaveUseCase {

	constructor(
		private readonly checkListsRepository: ICheckListsRepository,
		// private tagCheckListUseCase: TagsCheckListUseCase
	) { }


	async execute(data: ICheckListSaveRequestDTO[]): Promise<ICheckListResponseDTO[]> {

		const retorno: CheckListResponseDTO[] = [];

		for (const visita of data) {

			const { tags, ...itemVisita } = visita;

			const _dataPrimeiraVisita = itemVisita.dataPrimeiraVisita != undefined ? moment(itemVisita.dataPrimeiraVisita, 'YYYY-MM-DD hh:mm:ss').toDate() : undefined;
			const _dataCriacao = itemVisita?.id != undefined && itemVisita?.id != null ? undefined : moment().toDate();
			const itemCheckList = new CheckList(
				{
					...itemVisita,
					dataPrimeiraVisita: _dataPrimeiraVisita,
					dataCriacao: _dataCriacao
				}, itemVisita?.id);

			if (!itemVisita?.id) {
				const _checkList = new CheckListResponseDTO(await this.checkListsRepository.create(itemCheckList));

				// _checkList.tags = (await this.salvarTag(tags, itemCheckList.id)).map(x => new TagResponseDTO(x));

				retorno.push(_checkList);

				continue;
			}

			const _checkList = new CheckListResponseDTO(await this.checkListsRepository.update(itemCheckList));

			// await this.deleteTag(tags, _checkList.id);
			// _checkList.tags = (await this.salvarTag(tags, itemCheckList.id)).map(x => new TagResponseDTO(x));

			retorno.push(_checkList);

			// await this.salvarTag(tags, itemCheckList.id);
		}

		return retorno;
	}

	// private async salvarTag(tags: ITagSaveRequestDTO[], checkListId: string) {
	// 	const _tags: Tag[] = [];
	// 	for (const tag of tags) {
	// 		_tags.push(await this.tagCheckListUseCase.handleSave({ tagId: tag.id, checkListId }));
	// 	}
	// 	return _tags;
	// }

	// private async deleteTag(tags: ITagSaveRequestDTO[], checkListId: string) {
	// 	if (tags?.length > 0) {

	// 		const allTags = await this.tagCheckListUseCase.handleGetAllTags(checkListId);
	// 		const tagsNotInPayload = allTags.filter(x => tags.map(y => y.id).includes(x.id) === false);

	// 		for (const tag of tagsNotInPayload) {
	// 			await this.tagCheckListUseCase.handleDelete({ tagId: tag.id, checkListId });
	// 		}
	// 	}
	// }
}