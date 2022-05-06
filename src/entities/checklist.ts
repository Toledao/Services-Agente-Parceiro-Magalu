import { Agente } from './agente';
import { Entity } from './entity';
import { Parceiro } from './parceiro';

export class CheckList extends Entity {
	id: string;
	pergunta: string;
	resposta: string;
	tipo: string;
	dataCriacao: Date;
	agenteId: string;
	agente: Agente;
	parceiroId: string;
	parceiro: Parceiro;

	constructor(props: Omit<CheckList, 'id' | 'parceiro' | 'agente'>, _id?: string) {
		const { id, ..._props } = props;
		super(_id);
		Object.assign(this, _props);
	}
}