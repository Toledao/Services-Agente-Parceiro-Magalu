import { Entity } from '@entities/entity';

export interface IRepository<T extends Entity> {

	create(obj: T): Promise<T>;

	update(obj: T): Promise<T>;

	getList(): Promise<T[]>;

	getList(objFilter: T): Promise<T[]>;

	getById(id: string): Promise<T>;

	delete(id: string): Promise<boolean>;

}