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
		}, data?.id);

		if (!data?.id) {
			return new RoteiroResponseDTO(await this.roteirosRepository.create(roteiro));
		}
		else {
			const visita = await this.roteirosRepository.getById(data.id);
			if (moment().isAfter(visita.dataVisita))
				throw new Error('Não é possivel alterar a visita com horário passado.');

			return new RoteiroResponseDTO(await this.roteirosRepository.update(roteiro));
		}
	}
}