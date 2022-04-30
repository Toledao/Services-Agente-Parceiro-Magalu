import { Parceiro } from '@entities/parceiro';
import { IParceirosRepository } from '@repositories/IParceirosRepository';
import { DtoSearchSegments } from '@repositories/SearchDTO';
import { Repository } from './repository';

export class ParceirosRepository extends Repository<Parceiro> implements IParceirosRepository {

	async create({ 
		agenteId,
		cpnj,
		descricao,
		endereco,
		enderecoBairro,
		enderecoCep,
		enderecoCidade,
		enderecoEstado,
		enderecoNumero,
		enderecoPais,
		enderecoReferencia,
		nome,
		reponsavel,
	}:Parceiro): Promise<Parceiro> {

		const Parceiro = await this.PrismaClient.parceiro.create({
			data: {
				agenteId,
				cpnj,
				descricao,
				endereco,
				enderecoBairro,
				enderecoCep,
				enderecoCidade,
				enderecoEstado,
				enderecoNumero,
				enderecoPais,
				enderecoReferencia,
				nome,
				reponsavel,
				ativo: true
			}
		});

		return <Parceiro>{ ...Parceiro };
	}

	async update({ 
		id,
		agenteId,
		cpnj,
		descricao,
		endereco,
		enderecoBairro,
		enderecoCep,
		enderecoCidade,
		enderecoEstado,
		enderecoNumero,
		enderecoPais,
		enderecoReferencia,
		nome,
		reponsavel
	}: Parceiro): Promise<Parceiro> {

		const Parceiro = await this.PrismaClient.parceiro.update({
			where: {
				id
			},

			data: {
				agenteId,
				cpnj,
				descricao,
				endereco,
				enderecoBairro,
				enderecoCep,
				enderecoCidade,
				enderecoEstado,
				enderecoNumero,
				enderecoPais,
				enderecoReferencia,
				nome,
				reponsavel,
			}
		});

		return <Parceiro>{ ...Parceiro };
	}

	async getList(): Promise<Parceiro[]> {
		const Parceiro = await this.PrismaClient.parceiro.findMany();
		return <Parceiro[]>{ ...Parceiro };
	}

	async getById(id: string): Promise<Parceiro> {
		const Parceiro = await this.PrismaClient.parceiro.findFirst({
			where: {
				id
			}
		});

		return <Parceiro>{ ...Parceiro };
	}

	async delete(id: string): Promise<boolean> {
		await this.PrismaClient.parceiro.delete({
			where: {
				id
			}
		});

		return !await this.getById(id);
	}

	async getByFilter(objFilter: Parceiro): Promise<Parceiro[]> {

		const { skip, take, where, orderBy } = this.filterService.CreateFilter(new DtoSearchSegments(objFilter));
		const parceiros = await this.PrismaClient.parceiro.findMany({
			skip,
			take,
			where: {
				...where
			},
			orderBy: orderBy,
		});
		return parceiros.map(x => new Parceiro(<Parceiro>x));
	}
}