import { RoteirosRepository } from '@repositories/implementations/roteirosRepository';
import { RoteirosController } from './RoteiroController';
import { RoteiroDeleteUseCase } from './RoteiroDeleteUseCase';
import { RoteiroGetUseCase } from './RoteiroGetUseCase';
import { RoteiroSaveUseCase } from './RoteiroSaveUseCase';

const repoBase = new RoteirosRepository();
const getUseCase = new RoteiroGetUseCase(repoBase);
const saveUseCase = new RoteiroSaveUseCase(repoBase);
const deleteRoteiroUseCase = new RoteiroDeleteUseCase(repoBase);

const roteiroController = new RoteirosController(saveUseCase, getUseCase, deleteRoteiroUseCase);

export { roteiroController as RegisterRoteiroController };