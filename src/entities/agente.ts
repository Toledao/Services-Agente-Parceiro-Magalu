import { Entity } from './entity';

export class Agente extends Entity {

	nome: string;
	cpf: string;
	email: string;
	senha: string;
	dataCriacao: Date;

	constructor(props: Omit<Agente, 'id'>, id?: string) {
		super(id);
		Object.assign(this, props);
	}
}