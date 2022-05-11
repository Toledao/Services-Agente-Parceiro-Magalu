import { ITagsRepository } from '@repositories/ITagsRepository';

export class TagDeleteUseCase {

	constructor(
		private readonly tagsRepository: ITagsRepository
	) { }

	async execute(id: string): Promise<boolean> {
		return await this.tagsRepository.delete(id);
	}
}