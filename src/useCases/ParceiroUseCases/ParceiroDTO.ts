import { Parceiro } from '@entities/parceiro';
import { AgenteResponseDTO } from '@usecases/AgentesUseCases/agentesDTO';

export interface IParceiroSaveRequestDTO {
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
	agenteId: string;
}

export interface IParceiroSaveResponseDTO {
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

export class ParceiroResponseDTO implements IParceiroSaveResponseDTO {

	constructor(props: Parceiro) {

		Object.assign(this, props);
	}
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

export interface IParceiroDeleteRequestDTO {
	id?: string;
}

export interface IParceiroQueryRequestDTO {
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
