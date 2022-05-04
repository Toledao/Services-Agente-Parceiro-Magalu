import { Tag } from '@entities/tag';
import { TagsRepository } from '@repositories/implementations/tagRepository';


export class TagsRoteiroUseCase {

	constructor(
		private readonly tagRepository: TagsRepository
	) { }

	async handleSave({ tagId, roteiroId }): Promise<Tag> {

		return await this.tagRepository.saveToRoteiro({ tagId, roteiroId });
	}

	async handleGetAllTags(roteiroId): Promise<Tag[]> {

		return await this.tagRepository.findByRoteiroId(roteiroId);
	}

	async handleDelete({ tagId, roteiroId }): Promise<void> {

		await this.tagRepository.deleteToRoteiro({ tagId, roteiroId });
	}

}