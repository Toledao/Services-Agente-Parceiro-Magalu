import { Entity } from '@entities/entity';
import { IRepository } from '@repositories/IRepository';
import { Prisma, PrismaClient } from '@prisma/client';

export class Repository<T extends Entity> implements IRepository<T> {

	protected clientPrisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

	constructor() {
		this.clientPrisma = new PrismaClient();
	}

	create(obj: T): Promise<T> {
		throw new Error('Method not implemented.');
	}

	update(obj: T): Promise<T> {
		throw new Error('Method not implemented.');
	}

	save(obj: T): Promise<T> {
		throw new Error('Method not implemented.');
	}

	getList(): Promise<T[]> {
		throw new Error('Method not implemented.');
	}

	getById(id: string): Promise<T> {
		throw new Error('Method not implemented.');
	}

	delete(id: string): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

}