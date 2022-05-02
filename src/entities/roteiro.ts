import { Agente } from './agente';
import { Entity } from './entity';
import { Parceiro } from './parceiro';

export class Roteiro extends Entity {

	dataVisita: Date;
	dataCriacao: Date;
	tipoVisita: TipoVisita;
	parceiroId: string;
	parceiro: Parceiro;

	agenteId: string;
	agente: Agente;

	constructor(props: Omit<Roteiro, 'id' | 'agente' | 'parceiro'>, id?: string) {
		super(id);
		Object.assign(this, props);
	}
}

export enum TipoVisita {
	Presencial = 'Presencial',
	Videoconferencia = 'Videoconferencia',
	Ligacao = 'Ligacao',
}