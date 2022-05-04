import { Tag } from '@entities/tag';
import { ITagsRepository } from '@repositories/ITagsRepository';
import { ITagSaveRequestDTO, TagResponseDTO } from './TagDTO';

export class SaveTagUseCase {

	constructor(
		private readonly tagsRepository: ITagsRepository
	) { }


	async execute(data: ITagSaveRequestDTO): Promise<TagResponseDTO> {

		const tag = new Tag(<Tag>data);

		if (!data.id) {
			const tagExiste = await this.tagsRepository.ExistsByAgenteId(data.cor, data.agenteId);

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