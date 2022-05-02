import { IRoteirosRepository } from '@repositories/IRoteirosRepository';

export class DeleteRoteiroUseCase {

	constructor(
		private readonly roteirosRepository: IRoteirosRepository
	) { }

	async execute(id: string): Promise<boolean> {
		return await this.roteirosRepository.delete(id);
	}
}