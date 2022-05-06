import { CheckList } from '@entities/checklist';
import { ICheckListsRepository } from '@repositories/ICheckListsRepository';
import { DtoSearchSegments } from '@repositories/SearchDTO';
import moment from 'moment';
import { Repository } from './repository';


export class CheckListsRepository extends Repository<CheckList> implements ICheckListsRepository {

	async findByParceiroId(parceiroId: string): Promise<CheckList[]> {
		const checkList = await this.PrismaClient.checkList.findMany({
			where: {
				parceiroId
			}
		});

		return <CheckList[]>checkList;
	}

	async findByAgenteId(agenteId: string): Promise<CheckList[]> {
		const checkList = await this.PrismaClient.checkList.findMany({
			where: {
				agenteId
			}
		});

		return <CheckList[]>checkList;
	}

	async create({ id, qtdeSku, canaisVendaOnline, dataPrimeiraVisita, imagens, percepcaoGeral, preferenciaContato, pussuiErpHub, redesSociaisAtivas, tipoLogistica, agenteId, parceiroId }
		: CheckList): Promise<CheckList> {

		const checkList = await this.PrismaClient.checkList.create({
			data: {
				id,
				qtdeSku,
				canaisVendaOnline,
				dataPrimeiraVisita,
				imagens,
				percepcaoGeral,
				preferenciaContato,
				pussuiErpHub,
				redesSociaisAtivas,
				tipoLogistica,
				agenteId,
				parceiroId,
				dataCriacao: moment().toNow()
			}
		});

		return <CheckList>checkList;
	}

	async update({ id, qtdeSku, canaisVendaOnline, dataPrimeiraVisita, imagens, percepcaoGeral, preferenciaContato, pussuiErpHub, redesSociaisAtivas, tipoLogistica, agenteId, parceiroId }
		: CheckList): Promise<CheckList> {

		const checkList = await this.PrismaClient.checkList.update({
			where: {
				id
			},
			data: {
				qtdeSku,
				canaisVendaOnline,
				dataPrimeiraVisita,
				imagens,
				percepcaoGeral,
				preferenciaContato,
				pussuiErpHub,
				redesSociaisAtivas,
				tipoLogistica,
				agenteId,
				parceiroId,
			}
		});

		return <CheckList>checkList;
	}

	async getList(): Promise<CheckList[]> {
		const checkList = await this.PrismaClient.checkList.findMany();
		return <CheckList[]>{ ...checkList };
	}

	async getById(id: string): Promise<CheckList> {
		const checkList = await this.PrismaClient.checkList.findFirst({
			where: {
				id
			}
		});

		return <CheckList>checkList;
	}

	async delete(id: string): Promise<boolean> {
		await this.PrismaClient.checkList.delete({
			where: {
				id
			}
		});

		return !await this.getById(id);
	}

	async getByFilter(objFilter: CheckList): Promise<CheckList[]> {

		const { skip, take, where, orderBy } = this.filterService.CreateFilter(new DtoSearchSegments(objFilter));
		const checkList = await this.PrismaClient.checkList.findMany({
			skip,
			take,
			where: {
				...where
			},
			orderBy: orderBy,
		});
		return checkList.map(x => <CheckList>x);
	}

}