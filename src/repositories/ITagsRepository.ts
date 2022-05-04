import { Tag } from '@entities/tag';
import { IRepository } from './IRepository';

export interface ITagsRepository extends IRepository<Tag> {

	findByAgenteId(agenteId: string): Promise<Tag[]>;

	ExistsByAgenteId({ nome, cor, agenteId }): Promise<boolean>;

	findByRoteiroId(roteiroId: string): Promise<Tag[]>;

}