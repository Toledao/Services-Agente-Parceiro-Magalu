import { Roteiro } from '@entities/roteiro';
import { IRoteirosRepository } from '@repositories/IRoteirosRepository';
import moment from 'moment';
import { IRoteiroResponseDTO, IRoteiroSaveRequestDTO, RoteiroResponseDTO } from './RoteiroDTO';


export class RoteiroSaveUseCase {

	constructor(
		private readonly roteirosRepository: IRoteirosRepository
	) { }


	async execute(data: IRoteiroSaveRequestDTO[]): Promise<IRoteiroResponseDTO[]> {

		const ret: RoteiroResponseDTO[] = [];

		for (const visita of data) {

			const _dataVisita = visita.dataVisita != undefined ? moment(visita.dataVisita, 'YYYY-MM-DD hh:mm:ss').toDate() : undefined;
			const _dataCriacao = visita?.id != undefined && visita?.id != null ? undefined : moment().toDate();
			const itemRoteiro = new Roteiro(
				{
					...visita,
					dataVisita: _dataVisita,
					dataCriacao: _dataCriacao
				}, visita?.id);

			if (!visita?.id) {
				ret.push(
					new RoteiroResponseDTO(
						await this.roteirosRepository.create(itemRoteiro)
					)
				);
				continue;
			}

			const visitaExistente = await this.roteirosRepository.getById(visita.id);
			if (moment().isAfter(visitaExistente.dataVisita))
				throw new Error('Não é possivel alterar a visita com horário passado.');

			ret.push(
				new RoteiroResponseDTO(
					await this.roteirosRepository.update(itemRoteiro)
				)
			);
		}

		return ret;
	}
}