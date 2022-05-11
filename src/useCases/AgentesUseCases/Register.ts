import { AgentesRepository } from '@repositories/implementations/agentesRepository';
import { AgentesController } from './agentesController';
import { DeleteAgenteUseCase } from './DeleteAgenteUseCase';
import { GetAgenteUseCase } from './GetAgenteUseCase';
import { SaveAgenteUseCase } from './SaveAgenteUseCase';

const agentesRepository = new AgentesRepository();

const saveAgenteUseCase = new SaveAgenteUseCase(agentesRepository);
const getAgenteUseCase = new GetAgenteUseCase(agentesRepository);
const deleteAgenteUseCase = new DeleteAgenteUseCase(agentesRepository);

const RegisterAgentesController = new AgentesController(saveAgenteUseCase, getAgenteUseCase, deleteAgenteUseCase);

export { RegisterAgentesController };