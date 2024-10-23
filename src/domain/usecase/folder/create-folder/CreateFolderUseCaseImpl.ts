import { CreateFolderUseCase } from './CreateFolderUseCase';
import { CreateFolderRepository } from '../../../../data/repository/folder/create-folder/CreateFolderRepository';
import { Folder } from '../../../models/Folder';

export class CreateFolderUseCaseImpl implements CreateFolderUseCase {

  constructor(
      private readonly repository: CreateFolderRepository
  ) {}

  async handle(folder: Folder): Promise<void> {
    await this.repository.handle(folder);
  }
}
