import { Tag } from '@entities/tag';
import { ITagsRepository } from '@repositories/ITagsRepository';
import { ITagQueryRequestDTO, TagResponseDTO } from './TagDTO';

export class TagGetUseCase {

	constructor(
		private readonly tagsRepository: ITagsRepository
	) { }

	async execute(data?: ITagQueryRequestDTO): Promise<TagResponseDTO[]> {

		if (data?.id === undefined || data?.id === '') {
			const ret = await this.tagsRepository.getByFilter(<Tag>{ ...data });
			return ret.length === 0 ? [] : ret.map(x => new TagResponseDTO(x));
		}

		const ret = await this.tagsRepository.getById(data.id);

		return !ret?.id ? [] : Array<TagResponseDTO>(new TagResponseDTO(ret));
	}
}