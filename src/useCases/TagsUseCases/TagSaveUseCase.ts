import { Tag } from '@entities/tag';
import { ITagsRepository } from '@repositories/ITagsRepository';
import { ITagSaveRequestDTO, TagResponseDTO } from './TagDTO';

export class TagSaveUseCase {

	constructor(
		private readonly tagsRepository: ITagsRepository
	) { }


	async execute(data: ITagSaveRequestDTO): Promise<TagResponseDTO> {

		if (!data?.agenteId) {
			throw new Error('Necessário informar o agenteId.');
		}

		const tag = new Tag(<Tag>data);

		if (!data.id) {
			const tagExiste = await this.tagsRepository.ExistsByAgenteId({ ...data });

			if (tagExiste) {
				throw new Error('Tag já existente.');
			}

			return new TagResponseDTO(await this.tagsRepository.create(tag));
		}
		else {
			return new TagResponseDTO(await this.tagsRepository.update(tag));
		}
	}
}