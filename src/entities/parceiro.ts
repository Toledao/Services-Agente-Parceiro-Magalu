import { Agente } from './agente';
import { Entity } from './entity';
import { Roteiro } from './roteiro';

export class Parceiro extends Entity {

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
	agente?: Agente; 

	roteiro: Roteiro[];

	constructor(props: Omit<Parceiro, 'id' | 'roteiro' | 'agente'>, id?: string) {
		super(id);
		Object.assign(this, props);
	}
}