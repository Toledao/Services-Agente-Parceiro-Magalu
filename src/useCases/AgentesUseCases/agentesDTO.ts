import { Agente } from '@entities/agente';

export class AgenteQueryRequestDTO {
	id: string;
	nome: string;
	email: string;
	cpf: string;
	dataCriacao: Date;
}

export class AgenteSaveRequestDTO {
	id?: string;
	nome: string;
	email: string;
	cpf: string;
	senha: string;
}

export class AgenteResponseDTO {
	id: string;
	nome: string;
	email: string;
	cpf: string;

	constructor(props: Agente) {
		this.id = props?.id;
		this.nome = props?.nome;
		this.email = props?.email;
		this.cpf = props?.cpf;
	}
}