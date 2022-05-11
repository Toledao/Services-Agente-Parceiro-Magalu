import { Agente } from './agente';
import { Entity } from './entity';
import { Parceiro } from './parceiro';
import { TagRoteiro } from './tag';

export class Roteiro extends Entity {

	dataVisita: Date;
	dataCriacao: Date;
	tipoVisita: TipoVisita;
	parceiroId: string;
	parceiro: Parceiro;

	agenteId: string;
	agente: Agente;
	TagRoteiro: TagRoteiro[];

	constructor(props: Omit<Roteiro, 'id' | 'agente' | 'parceiro' | 'TagRoteiro'>, _id?: string) {
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