import { TagsRepository } from '@repositories/implementations/tagRepository';
import { TagsController } from './TagController';
import { TagDeleteUseCase } from './TagDeleteUseCase';
import { TagGetUseCase } from './TagGetUseCase';
import { TagSaveUseCase } from './TagSaveUseCase';

const repoBase = new TagsRepository();
const saveUseCase = new TagSaveUseCase(repoBase);
const getUseCase = new TagGetUseCase(repoBase);
const deleteUseCase = new TagDeleteUseCase(repoBase);

const tagController = new TagsController(saveUseCase, getUseCase, deleteUseCase);

export { tagController as RegisterTagController };