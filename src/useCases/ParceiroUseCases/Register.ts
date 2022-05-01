import { ParceirosRepository } from '@repositories/implementations/parceirosRepository';
import { DeleteParceiroUseCase } from './DeleteParceiroUseCase';
import { GetParceiroUseCase } from './GetParceiroUseCase';
import { ParceiroController } from './ParceiroController';
import { SaveParceiroUseCase } from './SaveParceiroUseCase';



const repobase = new ParceirosRepository();

const parceirosave = new SaveParceiroUseCase(repobase);
const parceriroGet = new GetParceiroUseCase(repobase);
const parceriroDelete = new DeleteParceiroUseCase(repobase);

const parceiroController = new ParceiroController(parceirosave, parceriroGet, parceriroDelete);

export { parceiroController as RegisterParceiroController };