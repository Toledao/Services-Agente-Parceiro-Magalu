export class IAgenteQueryRequestDTO {
	id: string;
	nome: string;
	email: string;
	cpf: string;
	dataCriacao: Date;
}

export class IAgenteSaveRequestDTO {
	id: string;
	nome: string;
	email: string;
	cpf: string;
	senha: string;
}

export class IAgenteResponseDTO {
	id: string;
	nome: string;
	email: string;
	cpf: string;
}