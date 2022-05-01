import { Agente } from './agente';
import { Entity } from './entity';
import { Roteiro } from './roteiro';

export class Parceiro extends Entity {

	nome: string;
	descricao: string;
	cpnj: string;
	telefone: string;
	email: string;
	endereco: string;
	enderecoNumero: string;
	bairro: string;
	referencia?: string;
	cep: string;
	cidade: string;
	estado: string;
	enderecoComplemento: string;
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