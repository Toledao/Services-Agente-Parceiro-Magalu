import { Agente } from './agente';
import { Entity } from './entity';

export class Roteiro extends Entity {

	dataVisita: Date;
	dataCriacao: Date;

	agenteId: string;
	agente: Agente;

	constructor(props: Omit<Roteiro, 'id'>, id?: string) {
		super(id);
		Object.assign(this, props);
	}
}