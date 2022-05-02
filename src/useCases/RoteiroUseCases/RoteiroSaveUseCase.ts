import { Roteiro } from '@entities/roteiro';
import { IRoteirosRepository } from '@repositories/IRoteirosRepository';
import moment from 'moment';
import { IRoteiroResponseDTO, IRoteiroSaveRequestDTO, RoteiroResponseDTO } from './RoteiroDTO';


export class RoteiroSaveUseCase {

	constructor(
		private readonly roteirosRepository: IRoteirosRepository
	) { }


	async execute(data: IRoteiroSaveRequestDTO): Promise<IRoteiroResponseDTO> {

		const roteiro = new Roteiro({
			...data,
			dataCriacao: data?.id != undefined && data?.id != null ? undefined : moment().toDate(),
			dataVisita: moment(data.dataVisita, 'DD/MM/YYYY').toDate()
		}, data?.id);

		if (!data?.id) {
			return new RoteiroResponseDTO(await this.roteirosRepository.create(roteiro));
		}
		else {
			return new RoteiroResponseDTO(await this.roteirosRepository.update(roteiro));
		}
	}
}