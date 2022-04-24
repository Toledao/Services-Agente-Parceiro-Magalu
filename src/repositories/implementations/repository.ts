import { Entity } from '@entities/entity';
import { IRepository } from '@repositories/IRepository';
import { PrismaClient } from '@prisma/client';
import { PrismaAdvancedFilteringService } from '@repositories/PrismaAdvancedFilteringService';

export abstract class Repository<T extends Entity> implements IRepository<T> {

	constructor(
		protected clientPrisma = new PrismaClient(),
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