import { uuid } from 'uuidv4';

export class Entity {
	id: string;

	constructor(id?: string) {
		if (!id) {
			this.id = uuid();
		}
		else {
			this.id = id;
		}
	}
}