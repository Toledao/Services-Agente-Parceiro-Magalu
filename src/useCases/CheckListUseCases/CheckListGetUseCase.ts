
import { CheckList } from '@entities/checklist';
import { ICheckListsRepository } from '@repositories/ICheckListsRepository';
import { ICheckListQueryRequestDTO, CheckListResponseDTO } from './CheckListDTO';

export class CheckListGetUseCase {

	constructor(
		private readonly checkListsRepository: ICheckListsRepository
	) { }

	async execute(data?: ICheckListQueryRequestDTO): Promise<CheckListResponseDTO[]> {

		if (data?.id === undefined || data?.id === '') {
			const ret = await this.checkListsRepository.getByFilter(<CheckList>{ ...data });
			const _ret = ret?.map(x => new CheckListResponseDTO(x));
			return ret.length === 0 ? [] : _ret;
		}

		const ret = await this.checkListsRepository.getById(data.id);

		return !ret?.id ? [] : Array<CheckListResponseDTO>(new CheckListResponseDTO(ret));
	}
}