import { IAgentesRepository } from '@repositories/IAgentesRepository';
import { AgenteQueryRequestDTO, AgenteResponseDTO } from './agentesDTO';

export class GetAgenteUseCase {

	constructor(
		private readonly agentesRepository: IAgentesRepository
	) { }

	async execute(data?: AgenteQueryRequestDTO): Promise<AgenteResponseDTO[]> {

		if (data?.id === undefined || data?.id === '') {
			const ret = await this.agentesRepository.getList();
			return ret.length === 0 ? [] : ret.map(x => new AgenteResponseDTO(x));
		}

		const ret = await this.agentesRepository.getById(data.id);

		return !ret?.id ? [] : Array<AgenteResponseDTO>(new AgenteResponseDTO(ret));
	}
}