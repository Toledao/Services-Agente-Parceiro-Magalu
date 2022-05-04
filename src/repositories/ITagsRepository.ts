import { Tag, TagParceiro, TagRoteiro } from '@entities/tag';
import { IRepository } from './IRepository';

export interface ITagsRepository extends IRepository<Tag> {

	findByAgenteId(agenteId: string): Promise<Tag[]>;

	existsByAgenteId({ nome, cor, agenteId }): Promise<boolean>;

	findByRoteiroId(roteiroId: string): Promise<Tag[]>;

	saveToRoteiro(props: Omit<TagRoteiro, 'tag' | 'roteiro'>): Promise<Tag>

	deleteToRoteiro({ tagId, roteiroId }: Omit<TagRoteiro, 'tag' | 'roteiro'>): Promise<void>

	saveToParceiro(props: Omit<TagParceiro, 'tag' | 'parceiro'>): Promise<Tag>

}