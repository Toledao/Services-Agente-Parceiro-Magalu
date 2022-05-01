import { Parceiro } from '@entities/parceiro';
import { IRepository } from './IRepository';

export interface IParceirosRepository extends IRepository<Parceiro>{

    createMany(obj: Parceiro[]): Promise<Parceiro[]>;

	updateMany(obj: Parceiro[]): Promise<Parceiro[]>;
    
}