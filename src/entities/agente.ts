import { Entity } from './entity';
import { Parceiro } from './parceiro';
import { Roteiro } from './roteiro';

export class Agente extends Entity {

	nome: string;
	cpf: string;
	email: string;
	senha: string;
	dataCriacao: Date;

	parceiro: Parceiro[];
	roteiro: Roteiro[];

	constructor(props: Omit<Agente, 'id' | 'parceiro' | 'roteiro'>, id?: string) {
		super(id);
		Object.assign(this, props);
	}
}