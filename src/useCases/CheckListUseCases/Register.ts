import { CheckListsRepository } from '@repositories/implementations/checkListRepository';
import { CheckListsController } from './CheckListController';
import { CheckListDeleteUseCase } from './CheckListDeleteUseCase';
import { CheckListGetUseCase } from './CheckListGetUseCase';
import { CheckListSaveUseCase } from './CheckListSaveUseCase';

const repobase = new CheckListsRepository();
const saveusecase = new CheckListSaveUseCase(repobase);
const getusecase = new CheckListGetUseCase(repobase);
const deleteusecase = new CheckListDeleteUseCase(repobase);

const checkListController = new CheckListsController(saveusecase, getusecase, deleteusecase);

export { checkListController as RegisterCheckListController };
