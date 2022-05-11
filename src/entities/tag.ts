import { Agente } from './agente';
import { Entity } from './entity';
import { Parceiro } from './parceiro';
import { Roteiro } from './roteiro';

export class Tag extends Entity {
	nome: string;
	cor: string;
	agenteId: string;
	exibePadrao: boolean;
	agente?: Agente;
	TagParceiro: TagParceiro[];
	TagRoteiro: TagRoteiro[];

	constructor(props: Omit<Tag, 'id' | 'TagRoteiro' | 'TagParceiro'>, _id?: string) {
		const { id, ..._props } = props;
		super(_id);
		Object.assign(this, _props);
	}
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