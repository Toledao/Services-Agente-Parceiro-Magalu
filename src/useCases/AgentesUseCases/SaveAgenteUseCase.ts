import { Agente } from '@entities/agente';
import { IAgentesRepository } from '@repositories/IAgentesRepository';
import { AgenteSaveRequestDTO, AgenteResponseDTO } from './agentesDTO';
import { hash } from 'bcryptjs';

export class SaveAgenteUseCase {

	constructor(
		private readonly agentesRepository: IAgentesRepository
	) { }


	async execute(data: AgenteSaveRequestDTO): Promise<AgenteResponseDTO> {

		const agente = new Agente({
			...data,
			senha: !data?.senha ? null : await hash(data.senha, 8),
			dataCriacao: new Date()
		});

		if (!data.id) {
			const agenteExiste = await this.agentesRepository.findByEmail(data.email);

			if (agenteExiste) {
				throw new Error('Agente já existente.');
			}
			return await this.agentesRepository.create(agente);
		}
		else {
			return await this.agentesRepository.update(agente);
		}
	}
}