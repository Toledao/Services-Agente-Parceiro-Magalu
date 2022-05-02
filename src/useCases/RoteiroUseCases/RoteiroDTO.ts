import { Roteiro, TipoVisita } from '@entities/roteiro';
import { Agente } from '@entities/agente';
import { Parceiro } from '@entities/parceiro';

export interface IRoteiroSaveRequestDTO {
	id?: string;
	dataVisita: Date;
	dataCriacao: Date;
	tipoVisita: TipoVisita;
	agenteId: string;
	parceiroId: string;
}

export interface IRoteiroResponseDTO {
	id: string;
	dataVisita: Date;
	dataCriacao: Date;
	tipoVisita: TipoVisita;
	agente: Agente;
	parceiro: Parceiro;
}

export class RoteiroResponseDTO implements IRoteiroResponseDTO {

	constructor(props: Roteiro) {

		Object.assign(this, props);
	}

	id: string;
	agente: Agente;
	parceiro: Parceiro;
	dataVisita: Date;
	dataCriacao: Date;
	tipoVisita: TipoVisita;
}

export interface IRoteiroDeleteRequestDTO {
	id?: string;
}

export interface IRoteiroQueryRequestDTO {
	id?: string;
	dataVisita: Date;
	dataCriacao: Date;
	tipoVisita: TipoVisita;
	agenteId: string;
	parceiroId: string;
}
