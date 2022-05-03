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

	constructor(props: Omit<Roteiro, 'id' | 'agente' | 'parceiro'>, _id?: string) {
		const { id, ..._props } = props;
		super(_id);
		Object.assign(this, _props);
	}
}

export enum TipoVisita {
	Presencial = 'Presencial',
	Videoconferencia = 'Videoconferencia',
	Ligacao = 'Ligacao',
}