import { GetSubfoldersUseCase } from './GetSubfoldersUseCase';
import { GetSubfoldersRepository } from '../../../../data/repository/folder/get-subfolders/GetSubfoldersRepository';
import { Folder } from '../../../models/Folder';

export class GetSubfoldersUseCaseImpl implements GetSubfoldersUseCase {

    constructor(
        private readonly repository: GetSubfoldersRepository
    ) {}

    async handle(parentId: number): Promise<Folder[]> {
        return await this.repository.handle(parentId);
    }
}
