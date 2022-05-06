import { CheckList } from '@entities/checklist';
import { IRepository } from './IRepository';

export interface ICheckListsRepository extends IRepository<CheckList> {

	findByAgenteId(agenteId: string): Promise<CheckList[]>;

	findByParceiroId(parceiroId: string): Promise<CheckList[]>;

}