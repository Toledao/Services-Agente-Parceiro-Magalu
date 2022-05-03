import { Parceiro } from '@entities/parceiro';
import { IParceirosRepository } from '@repositories/IParceirosRepository';
import { IParceiroQueryRequestDTO, IParceiroSaveResponseDTO, ParceiroResponseDTO } from './ParceiroDTO';

export class GetParceiroUseCase {

	constructor(
		private readonly parceirosRepository: IParceirosRepository
	) { }

	public async execute(data?: IParceiroQueryRequestDTO): Promise<IParceiroSaveResponseDTO[]> {

		if (data?.id === undefined || data?.id === '') {
			const ret = await this.parceirosRepository.getByFilter(<Parceiro>{ ...data });
			return ret.length === 0 ? [] : ret.map(x => new ParceiroResponseDTO(x));
		}

		const ret = await this.parceirosRepository.getById(data.id);

		return !ret?.id ? [] : Array<ParceiroResponseDTO>(new ParceiroResponseDTO(ret));
	}
}