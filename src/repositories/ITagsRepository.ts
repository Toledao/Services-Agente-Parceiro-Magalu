import { Tag } from '@entities/tag';
import { IRepository } from './IRepository';

export interface ITagsRepository extends IRepository<Tag> {

	findByAgenteId(agenteId: string): Promise<Tag[]>;

	ExistsByAgenteId(cor: string, agenteId: string): Promise<boolean>;

	findByRoteiroId(roteiroId: string): Promise<Tag[]>;

}