import { AgenteResponseDTO } from '@usecases/AgentesUseCases/agentesDTO';

export interface IParceiroSaveRequestDTO{
    id?: string;
    nome: string;  
	descricao: string;
	cpnj: string;
	endereco: string;
	enderecoNumero: string;
	enderecoBairro: string;
	enderecoReferencia?: string;
	enderecoCep: string;
	enderecoCidade: string;
	enderecoEstado: string;
	enderecoPais: string;
	ativo: boolean;
	reponsavel: string;
	agenteId: string;
}

export interface IParceiroSaveResponseDTO{
    id: string;
    nome: string;  
	descricao: string;
	cpnj: string;
	endereco: string;
	enderecoNumero: string;
	enderecoBairro: string;
	enderecoReferencia: string;
	enderecoCep: string;
	enderecoCidade: string;
	enderecoEstado: string;
	enderecoPais: string;
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
	endereco: string;
	enderecoNumero: string;
	enderecoBairro: string;
	enderecoReferencia?: string;
	enderecoCep: string;
	enderecoCidade: string;
	enderecoEstado: string;
	enderecoPais: string;
	ativo: boolean;
	reponsavel: string;
	agenteId: string;
}
