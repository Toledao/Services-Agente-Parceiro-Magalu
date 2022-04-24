import { Agente } from '@entities/agente';
import { IAgentesRepository } from '@repositories/IAgentesRepository';
import { DtoSearchSegments, FilterModel } from '@repositories/SearchDTO';
import { Repository } from './repository';

export class AgentesRepository extends Repository<Agente> implements IAgentesRepository {

	async findByEmail(email: string): Promise<Agente> {

		const agente = await this.clientPrisma.agente.findFirst({
			where: {
				email
			}
		});

		return agente;
	}

	async create({ cpf, email, nome, senha }: Agente): Promise<Agente> {

		const agente = await this.clientPrisma.agente.create({
			data: {
				cpf,
				email,
				nome,
				senha
			}
		});

		return agente;
	}

	async update({ id, cpf, email, nome, senha }: Agente): Promise<Agente> {

		const agente = await this.clientPrisma.agente.update({
			where: {
				id
			},
			data: {
				cpf,
				email,
				nome,
				senha
			}
		});

		return agente;
	}

	async getList(): Promise<Agente[]> {
		return await this.clientPrisma.agente.findMany();
	}

	async getById(id: string): Promise<Agente> {
		const agente = await this.clientPrisma.agente.findFirst({
			where: {
				id
			}
		});

		return agente;
	}

	async delete(id: string): Promise<boolean> {
		await this.clientPrisma.agente.delete({
			where: {
				id
			}
		});

		return !await this.getById(id);
	}

	async getByFilter(objFilter: Agente): Promise<Agente[]> {

		const { skip, take, where, orderBy } = this.filterService.CreateFilter(new DtoSearchSegments(objFilter));
		return this.clientPrisma.agente.findMany({
			skip,
			take,
			where: {
				...where
			},
			orderBy: orderBy,
		});
	}
}