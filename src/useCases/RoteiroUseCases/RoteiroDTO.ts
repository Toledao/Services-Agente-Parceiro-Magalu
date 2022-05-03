import { Roteiro, TipoVisita } from '@entities/roteiro';
import { Agente } from '@entities/agente';
import { Parceiro } from '@entities/parceiro';
import { AgenteResponseDTO } from '@usecases/AgentesUseCases/agentesDTO';
import { ParceiroResponseDTO } from '@usecases/ParceiroUseCases/ParceiroDTO';

export interface IRoteiroSaveRequestDTO {
	id?: string;
	dataVisita: Date;
	tipoVisita: TipoVisita;
	agenteId: string;
	parceiroId: string;
}

export interface IRoteiroResponseDTO {
	id: string;
	dataVisita: Date;
	dataCriacao: Date;
	tipoVisita: TipoVisita;
	agente: AgenteResponseDTO;
	parceiro: ParceiroResponseDTO;
}

export class RoteiroResponseDTO implements IRoteiroResponseDTO {

	constructor(props: Roteiro) {

		Object.assign(this, props);
	}

	id: string;
	agente: AgenteResponseDTO;
	parceiro: ParceiroResponseDTO;
	dataVisita: Date;
	dataCriacao: Date;
	tipoVisita: TipoVisita;
}

export interface IRoteiroDeleteRequestDTO {
	id?: string;
}

export class IRoteiroQueryRequestDTO {
	id: string;
	dataVisita: Date;
	dataCriacao: Date;
	tipoVisita: TipoVisita;
	agenteId: string;
	parceiroId: string;
}
