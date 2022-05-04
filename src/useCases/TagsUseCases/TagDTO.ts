import { Tag } from '@entities/tag';

export interface ITagSaveRequestDTO {
	id?: string;
	nome: string;
	cor: string;
	agenteId: string;
}

export interface ITagResponseDTO {
	id: string;
	nome: string;
	cor: string;
	exibePadrao: string;
	agenteId: string;
}

export class TagResponseDTO implements ITagResponseDTO {

	constructor(props: Tag) {

		Object.assign(this, props);
	}

	id: string;
	nome: string;
	cor: string;
	exibePadrao: string;
	agenteId: string;
}

export interface ITagDeleteRequestDTO {
	id?: string;
}

export class ITagQueryRequestDTO {
	id: string;
	nome: string;
	cor: string;
	exibePadrao: boolean;
	agenteId: string;
}