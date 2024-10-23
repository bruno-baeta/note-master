import { GetFoldersByUser } from './GetFoldersByUser';
import { GetFoldersByUserRepository } from '../../../../data/repository/folder/get-folders-by-user/GetFoldersByUserRepository';
import { Folder } from '../../../models/Folder';

export class GetUserFoldersUseCaseImpl implements GetFoldersByUser {

  constructor(
      private readonly repository: GetFoldersByUserRepository
  ) {}

  async handle(userId: number): Promise<Folder[]> {
    return await this.repository.handle(userId);
  }
}
