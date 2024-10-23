import { UpdateFolderDataSourceImpl } from "../../../data/data-source/folder/update-folder/UpdateFolderDataSourceImpl";
import { UpdateFolderRepositoryImpl } from "../../../data/repository/folder/update-folder/UpdateFolderRepositoryImpl";
import { UpdateFolderUseCaseImpl } from "../../../domain/usecase/folder/update-folder/UpdateFolderUseCaseImpl";

const updateFolderDataSource = new UpdateFolderDataSourceImpl();
const updateFolderRepository = new UpdateFolderRepositoryImpl(updateFolderDataSource);

export const updateFolderUseCase = new UpdateFolderUseCaseImpl(updateFolderRepository);
