import { Parceiro } from '@entities/parceiro';
import { IParceirosRepository } from '@repositories/IParceirosRepository';
import { DtoSearchSegments } from '@repositories/SearchDTO';
import { Repository } from './repository';

export class ParceirosRepository extends Repository<Parceiro> implements IParceirosRepository {

	async findByCnpj(cpnj: string): Promise<Parceiro> {

		const parceiro = await this.PrismaClient.parceiro.findFirst({
			where: {
				cpnj
			}
		});

		return <Parceiro>parceiro;
	}

	async create({
		id,
		nome,
		descricao,
		cpnj,
		telefone,
		email,
		endereco,
		enderecoNumero,
		bairro,
		referencia,
		cep,
		cidade,
		estado,
		enderecoComplemento,
		ativo,
		reponsavel,
		agenteId
	}: Parceiro): Promise<Parceiro> {

		const Parceiro = await this.PrismaClient.parceiro.create({
			data: {
				id,
				nome,
				descricao,
				cpnj,
				telefone,
				email,
				endereco,
				enderecoNumero,
				bairro,
				referencia,
				cep,
				cidade,
				estado,
				enderecoComplemento,
				ativo,
				reponsavel,
				agenteId
			}
		});

		return <Parceiro>Parceiro;
	}

	async update({
		id,
		nome,
		descricao,
		cpnj,
		telefone,
		email,
		endereco,
		enderecoNumero,
		bairro,
		referencia,
		cep,
		cidade,
		estado,
		enderecoComplemento,
		ativo,
		reponsavel,
		agenteId
	}: Parceiro): Promise<Parceiro> {

		const Parceiro = await this.PrismaClient.parceiro.update({
			where: {
				id
			},

			data: {
				nome,
				descricao,
				cpnj,
				telefone,
				email,
				endereco,
				enderecoNumero,
				bairro,
				referencia,
				cep,
				cidade,
				estado,
				enderecoComplemento,
				ativo,
				reponsavel,
				agenteId
			}
		});

		return <Parceiro>Parceiro;
	}

	async getList(): Promise<Parceiro[]> {
		const parceiro = await this.PrismaClient.parceiro.findMany({
			where: {
				ativo: true
			}
		});
		return <Parceiro[]>parceiro;
	}

	async getById(id: string): Promise<Parceiro> {
		const parceiro = await this.PrismaClient.parceiro.findFirst({
			where: {
				id,
				ativo: true
			}
		});

		return <Parceiro>parceiro;
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
		return parceiros.map(x => <Parceiro>x);
	}
}