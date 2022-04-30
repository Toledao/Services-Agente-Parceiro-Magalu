import { AgenteResponseDTO } from '@usecases/AgentesUseCases/agentesDTO';

export interface IParceiroSaveRequestDTO{
    nome: string;
	descricao: string;
	cpnj: string;
	telefone: string;
	email: string;
	endereco: string;
	enderecoNumero: string;
	bairro: string;
	referencia: string;
	cep: string;
	cidade: string;
	estado: string;
	enderecoComplemento: string;
	ativo: boolean;
	reponsavel: string;
	agenteId: string;
}

export interface IParceiroSaveResponseDTO{
    id: string;
    nome: string;
	descricao: string;
	cpnj: string;
	telefone: string;
	email: string;
	endereco: string;
	enderecoNumero: string;
	bairro: string;
	referencia: string;
	cep: string;
	cidade: string;
	estado: string;
	enderecoComplemento: string;
	ativo: boolean;
	reponsavel: string;
	agente: AgenteResponseDTO;
}

export interface IParceiroDeleteRequestDTO{
    id?: string;
}

export interface IParceiroQueryRequestDTO{
    id?: string;
    nome: string;
	descricao: string;
	cpnj: string;
	telefone: string;
	email: string;
	endereco: string;
	enderecoNumero: string;
	bairro: string;
	referencia: string;
	cep: string;
	cidade: string;
	estado: string;
	enderecoComplemento: string;
	ativo: boolean;
	reponsavel: string;
	agenteId: string;
}
