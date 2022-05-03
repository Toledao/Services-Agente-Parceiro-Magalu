import { Roteiro } from '@entities/roteiro';
import { IRepository } from './IRepository';

export interface IRoteirosRepository extends IRepository<Roteiro> {

	findByAgenteId(agenteId: string): Promise<Roteiro>;

	findByParceiroId(parceiroId: string): Promise<Roteiro>;

}