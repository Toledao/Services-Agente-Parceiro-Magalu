import { IParceirosRepository } from '@repositories/IParceirosRepository';

export class DeleteParceiroUseCase {

	constructor(
		private readonly parceirosRepository: IParceirosRepository
	) { }

	async execute(id: string): Promise<boolean> {
		const obj = await this.parceirosRepository.getById(id);
		obj.ativo = false;
		const ret = await this.parceirosRepository.update(obj);
		return ret?.ativo != undefined && ret?.ativo === false;
	}
}