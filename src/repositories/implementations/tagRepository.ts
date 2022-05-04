import { Tag } from '@entities/tag';
import { ITagsRepository } from '@repositories/ITagsRepository';
import { DtoSearchSegments } from '@repositories/SearchDTO';
import { Repository } from './repository';


export class TagsRepository extends Repository<Tag> implements ITagsRepository {

	async ExistsByAgenteId(cor: string, agenteId: string): Promise<boolean> {
		const tags = await this.findByAgenteId(agenteId);
		return tags.filter(x => x.cor === cor).length > 0;
	}

	async findByAgenteId(agenteId: string): Promise<Tag[]> {
		const tag = await this.PrismaClient.tag.findMany({
			where: {
				agenteId
			}
		});

		return <Tag[]>tag;
	}

	async findByRoteiroId(roteiroId: string): Promise<Tag[]> {
		const tag = await this.PrismaClient.tag.findMany({
			include: {
				TagRoteiro: {
					where: {
						roteiroId
					}
				}
			}
		});

		return <Tag[]>tag;
	}

	async create({ id, cor, nome, agenteId }: Tag): Promise<Tag> {

		const tag = await this.PrismaClient.tag.create({
			data: {
				id,
				cor,
				nome,
				agenteId,
				exibePadrao: false
			}
		});

		return <Tag>tag;
	}

	async update({ id, cor, nome, agenteId }: Tag): Promise<Tag> {

		const tag = await this.PrismaClient.tag.update({
			where: {
				id
			},
			data: {
				id,
				cor,
				nome,
				agenteId,
				exibePadrao: false
			}
		});

		return <Tag>tag;
	}

	async getList(): Promise<Tag[]> {
		const tag = await this.PrismaClient.tag.findMany();
		return <Tag[]>{ ...tag };
	}

	async getById(id: string): Promise<Tag> {
		const tag = await this.PrismaClient.tag.findFirst({
			where: {
				id
			}
		});

		return <Tag>tag;
	}

	async delete(id: string): Promise<boolean> {
		await this.PrismaClient.tag.delete({
			where: {
				id
			}
		});

		return !await this.getById(id);
	}

	async getByFilter(objFilter: Tag): Promise<Tag[]> {

		const { skip, take, where, orderBy } = this.filterService.CreateFilter(new DtoSearchSegments(objFilter));
		const tag = await this.PrismaClient.tag.findMany({
			skip,
			take,
			where: {
				...where
			},
			orderBy: orderBy,
		});
		return tag.map(x => <Tag>x);
	}

}