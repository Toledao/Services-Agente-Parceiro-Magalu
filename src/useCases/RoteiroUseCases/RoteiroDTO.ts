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

export interface IRoteiroSaveResponseDTO {
	id: string;
	dataVisita: Date;
	dataCriacao: Date;
	tipoVisita: TipoVisita;
	agente: Agente;
	parceiro: Parceiro;
}

export class RoteiroSaveResponseDTO implements IRoteiroSaveRequestDTO {

	constructor(props: Roteiro) {

		Object.assign(this, props);
	}
	id?: string;
	dataVisita: Date;
	dataCriacao: Date;
	tipoVisita: TipoVisita;
	agenteId: string;
	parceiroId: string;
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
