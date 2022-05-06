import { ICheckListsRepository } from '@repositories/ICheckListsRepository';

export class CheckListDeleteUseCase {

	constructor(
		private readonly checkListsRepository: ICheckListsRepository
	) { }

	async execute(id: string): Promise<boolean> {
		return await this.checkListsRepository.delete(id);
	}
}