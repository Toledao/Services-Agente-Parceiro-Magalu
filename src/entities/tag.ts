import { Agente } from './agente';
import { Parceiro } from './parceiro';
import { Roteiro } from './roteiro';

export class Tag {
	id: string;
	nome: string;
	cor: string;
	agenteId: string;
	exibePadrao: boolean;
	agente?: Agente;
	TagParceiro: TagParceiro[];
	TagRoteiro: TagRoteiro[];
}

export class TagParceiro {
	parceiroId: string;
	parceiro: Parceiro;
	tagId: string;
	tag: Tag;
}

export class TagRoteiro {
	roteiroId: string;
	roteiro: Roteiro;
	tagId: string;
	tag: Tag;
}