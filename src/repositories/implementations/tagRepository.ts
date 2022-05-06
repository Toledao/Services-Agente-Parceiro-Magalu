import { Tag, TagParceiro, TagRoteiro } from '@entities/tag';
import { ITagsRepository } from '@repositories/ITagsRepository';
import { DtoSearchSegments } from '@repositories/SearchDTO';
import { Repository } from './repository';


export class TagsRepository extends Repository<Tag> implements ITagsRepository {

	async saveToRoteiro({ tagId, roteiroId }: Omit<TagRoteiro, 'tag' | 'roteiro'>): Promise<Tag> {
		await this.PrismaClient.tagRoteiro.createMany({
			data: {
				tagId,
				roteiroId
			},
			skipDuplicates: true
		});

		return await this.getById(tagId);
	}

	async deleteToRoteiro({ tagId, roteiroId }: Omit<TagRoteiro, 'tag' | 'roteiro'>): Promise<void> {
		await this.PrismaClient.tagRoteiro.delete({
			where: {
				roteiroId_tagId: { tagId, roteiroId }
			}
		});
	}

	async saveToParceiro({ tagId, parceiroId }: Omit<TagParceiro, 'tag' | 'parceiro'>): Promise<Tag> {
		const tagParceiro = await this.PrismaClient.tagParceiro.create({
			data: {
				tagId,
				parceiroId
			},
			select: {
				tag: {
					select: {
						id: true,
						nome: true,
						cor: true
					}
				}
			}
		});
		return <Tag>tagParceiro.tag;
	}

	async existsByAgenteId({ nome, cor, agenteId }): Promise<boolean> {
		const tags = await this.findByAgenteId(agenteId);
		return tags.filter(x => x.cor === cor && x.nome === nome).length > 0;
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
			where: {
				TagRoteiro: {
					some: {
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

	async update({ id, cor, nome }: Tag): Promise<Tag> {

		const tag = await this.PrismaClient.tag.update({
			where: {
				id
			},
			data: {
				cor,
				nome,
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