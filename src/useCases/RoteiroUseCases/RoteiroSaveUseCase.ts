import { Roteiro } from '@entities/roteiro';
import { IRoteirosRepository } from '@repositories/IRoteirosRepository';
import { IRoteiroResponseDTO, IRoteiroSaveRequestDTO, RoteiroResponseDTO } from './RoteiroDTO';


export class RoteiroSaveUseCase {

	constructor(
		private readonly roteirosRepository: IRoteirosRepository
	) { }


	async execute(data: IRoteiroSaveRequestDTO): Promise<IRoteiroResponseDTO> {

		const roteiro = new Roteiro({ ...data });

		if (!data?.id) {
			return new RoteiroResponseDTO(await this.roteirosRepository.create(roteiro));
		}
		else {
			return new RoteiroResponseDTO(await this.roteirosRepository.update(roteiro));
		}
	}
}