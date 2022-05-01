import { Agente } from '@entities/agente';
import { IAgentesRepository } from '@repositories/IAgentesRepository';
import { DtoSearchSegments } from '@repositories/SearchDTO';
import { Repository } from './repository';

export class AgentesRepository extends Repository<Agente> implements IAgentesRepository {

	async findByEmail(email: string): Promise<Agente> {

		const agente = await this.PrismaClient.agente.findFirst({
			where: {
				email
			}
		});

		return <Agente>agente;
	}

	async create({ cpf, email, nome, senha }: Agente): Promise<Agente> {

		const agente = await this.PrismaClient.agente.create({
			data: {
				cpf,
				email,
				nome,
				senha
			}
		});

		return <Agente>agente;
	}

	async update({ id, cpf, email, nome, senha }: Agente): Promise<Agente> {

		const agente = await this.PrismaClient.agente.update({
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

		return <Agente>agente;
	}

	async getList(): Promise<Agente[]> {
		const agente = await this.PrismaClient.agente.findMany();
		return <Agente[]>{ ...agente };
	}

	async getById(id: string): Promise<Agente> {
		const agente = await this.PrismaClient.agente.findFirst({
			where: {
				id
			}
		});

		return <Agente>agente;
	}

	async delete(id: string): Promise<boolean> {
		await this.PrismaClient.agente.delete({
			where: {
				id
			}
		});

		return !await this.getById(id);
	}

	async getByFilter(objFilter: Agente): Promise<Agente[]> {

		const { skip, take, where, orderBy } = this.filterService.CreateFilter(new DtoSearchSegments(objFilter));
		const agente = await this.PrismaClient.agente.findMany({
			skip,
			take,
			where: {
				...where
			},
			orderBy: orderBy,
		});
		return agente.map(x => new Agente(<Agente>x));
	}
}