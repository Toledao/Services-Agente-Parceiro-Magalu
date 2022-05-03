import { Roteiro } from '@entities/roteiro';
import { IRoteirosRepository } from '@repositories/IRoteirosRepository';
import { IRoteiroQueryRequestDTO, RoteiroResponseDTO } from './RoteiroDTO';

export class RoteiroGetUseCase {

	constructor(
		private readonly roteirosRepository: IRoteirosRepository
	) { }

	async execute(data?: IRoteiroQueryRequestDTO): Promise<RoteiroResponseDTO[]> {

		if (data?.id === undefined || data?.id === '') {
			const ret = await this.roteirosRepository.getByFilter(<Roteiro>{ ...data });
			return ret.length === 0 ? [] : ret.map(x => new RoteiroResponseDTO(x));
		}

		const ret = await this.roteirosRepository.getById(data.id);

		return !ret?.id ? [] : Array<RoteiroResponseDTO>(new RoteiroResponseDTO(ret));
	}
}