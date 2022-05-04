import { Tag } from '@entities/tag';
import { IRepository } from './IRepository';

export interface ITagsRepository extends IRepository<Tag> {

	findByAgenteId(agenteId: string): Promise<Tag>;

	findByRoteiroId(roteiroId: string): Promise<Tag>;

}