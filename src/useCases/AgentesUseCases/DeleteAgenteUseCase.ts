import { IAgentesRepository } from '@repositories/IAgentesRepository';

export class DeleteAgenteUseCase {

	constructor(
		private readonly agentesRepository: IAgentesRepository
	) { }

	async execute(id: string): Promise<boolean> {
		return await this.agentesRepository.delete(id);
	}
}