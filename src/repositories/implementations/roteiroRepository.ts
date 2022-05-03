import { Roteiro } from '@entities/roteiro';
import { IRoteirosRepository } from '@repositories/IRoteirosRepository';
import { DtoSearchSegments } from '@repositories/SearchDTO';
import { Repository } from './repository';


export class RoteiroRepository extends Repository<Roteiro> implements IRoteirosRepository {

	async findByAgenteId(agenteId: string): Promise<Roteiro> {
		const roteiro = await this.PrismaClient.roteiro.findFirst({
			where: {
				agenteId
			}
		});

		return <Roteiro>roteiro;
	}

	async findByParceiroId(parceiroId: string): Promise<Roteiro> {
		const roteiro = await this.PrismaClient.roteiro.findFirst({
			where: {
				parceiroId
			}
		});

		return <Roteiro>roteiro;
	}

	async create({ id, dataVisita, dataCriacao, tipoVisita, parceiroId, agenteId }: Roteiro): Promise<Roteiro> {

		const roteiro = await this.PrismaClient.roteiro.create({
			data: {
				id,
				dataVisita,
				dataCriacao,
				tipoVisita,
				parceiroId,
				agenteId
			}
		});

		return <Roteiro>roteiro;
	}

	async update({ id, dataVisita, dataCriacao, tipoVisita, parceiroId, agenteId }: Roteiro): Promise<Roteiro> {

		const roteiro = await this.PrismaClient.roteiro.update({
			where: {
				id
			},
			data: {
				dataVisita,
				dataCriacao,
				tipoVisita,
				parceiroId,
				agenteId
			}
		});

		return <Roteiro>roteiro;
	}

	async getList(): Promise<Roteiro[]> {
		const roteiro = await this.PrismaClient.roteiro.findMany();
		return <Roteiro[]>{ ...roteiro };
	}

	async getById(id: string): Promise<Roteiro> {
		const roteiro = await this.PrismaClient.roteiro.findFirst({
			where: {
				id
			}
		});

		return <Roteiro>roteiro;
	}

	async delete(id: string): Promise<boolean> {
		await this.PrismaClient.roteiro.delete({
			where: {
				id
			}
		});

		return !await this.getById(id);
	}

	async getByFilter(objFilter: Roteiro): Promise<Roteiro[]> {

		const { skip, take, where, orderBy } = this.filterService.CreateFilter(new DtoSearchSegments(objFilter));
		const roteiro = await this.PrismaClient.roteiro.findMany({
			skip,
			take,
			where: {
				...where
			},
			orderBy: orderBy,
		});
		return roteiro.map(x => new Roteiro(<Roteiro>x));
		return roteiro.map(x => <Roteiro>x);
	}

}