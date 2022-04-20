import { Agente } from '@entities/agente';
import { IAgentesRepository } from '@repositories/IAgentesRepository';
import { IAgenteQueryRequestDTO } from './agentesDTO';

export class GetAgenteUseCase {

	constructor(
		private readonly agentesRepository: IAgentesRepository
	) { }

	async execute(data: IAgenteQueryRequestDTO): Promise<Agente[]> {

		if (!data.id) {
			return await this.agentesRepository.getList();
		}

		return Array<Agente>(await this.agentesRepository.getById(data.id));
	}
}