import {DeleteFolderUseCaseImpl} from "../../../domain/usecase/folder/delete-folder/DeleteFolderUseCaseImpl";
import {DeleteFolderDataSourceImpl} from "../../../data/data-source/folder/delete-folder/DeleteFolderDataSourceImpl";
import {DeleteFolderRepositoryImpl} from "../../../data/repository/folder/delete-folder/DeleteFolderRepositoryImpl";

const deleteFolderDataSource = new DeleteFolderDataSourceImpl();
const deleteFolderRepository = new DeleteFolderRepositoryImpl(deleteFolderDataSource);

export const deleteFolderUseCase = new DeleteFolderUseCaseImpl(deleteFolderRepository);
