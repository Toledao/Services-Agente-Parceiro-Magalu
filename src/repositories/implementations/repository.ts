import { Entity } from '@entities/entity';
import { IRepository } from '@repositories/IRepository';
import { PrismaAdvancedFilteringService } from '@repositories/PrismaAdvancedFilteringService';
import { PrismaClient as Prisma} from '@repositories/PrismaClient';

export abstract class Repository<T extends Entity> implements IRepository<T> {

	constructor(
		protected PrismaClient = Prisma,
		protected filterService = new PrismaAdvancedFilteringService()
	) { }

	create(obj: T): Promise<T> {
		throw new Error('Method not implemented.');
	}
	update(obj: T): Promise<T> {
		throw new Error('Method not implemented.');
	}
	getList(): Promise<T[]> {
		throw new Error('Method not implemented.');
	}
	getByFilter(objFilter: T): Promise<T[]> {
		throw new Error('Method not implemented.');
	}
	getById(id: string): Promise<T> {
		throw new Error('Method not implemented.');
	}
	delete(id: string): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

}