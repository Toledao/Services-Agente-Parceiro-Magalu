import { Parceiro } from '@entities/parceiro';
import { IRepository } from './IRepository';

export interface IParceirosRepository extends IRepository<Parceiro> {

	findByCnpj(cpnj: string): Promise<Parceiro>;

}