import { Agente } from '@entities/agente';
import { IRepository } from './IRepository';

export interface IAgentesRepository extends IRepository<Agente> {

	findByEmail(email: string): Promise<Agente>;

}