import { TagsRepository } from '@repositories/implementations/tagRepository';
import { TagsController } from './TagController';
import { TagDeleteUseCase } from './TagDeleteUseCase';
import { TagGetUseCase } from './TagGetUseCase';
import { TagSaveUseCase } from './TagSaveUseCase';
import { TagsRoteiroUseCase } from './TagsRoteiroUseCase';

const repoBase = new TagsRepository();

const tagRoteiroUseCase = new TagsRoteiroUseCase(repoBase);
const saveUseCase = new TagSaveUseCase(repoBase);
const getUseCase = new TagGetUseCase(repoBase);
const deleteUseCase = new TagDeleteUseCase(repoBase);

const tagController = new TagsController(saveUseCase, getUseCase, deleteUseCase);

export { tagController as RegisterTagController, tagRoteiroUseCase as RegisterTagRoteiroUseCase };