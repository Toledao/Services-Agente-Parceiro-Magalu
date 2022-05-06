import { Agente } from './agente';
import { Entity } from './entity';
import { Parceiro } from './parceiro';

export class CheckList extends Entity {
	id: string;
	preferenciaContato: string;
	redesSociaisAtivas: string;
	canaisVendaOnline: string;
	qtdeSku: string;
	pussuiErpHub: string;
	tipoLogistica: string;
	percepcaoGeral: string;
	imagens: string;
	dataPrimeiraVisita: Date;
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

