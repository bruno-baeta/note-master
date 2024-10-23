import {DeleteUserDataSourceImpl} from "../../../data/data-source/user/delete-user/DeleteUserDataSourceImpl";
import {DeleteUserRepositoryImpl} from "../../../data/repository/user/delete-user/DeleteUserRepositoryImpl";
import {DeleteFolderUseCaseImpl} from "../../../domain/usecase/folder/delete-folder/DeleteFolderUseCaseImpl";

const deleteFolderDataSource = new DeleteUserDataSourceImpl();
const deleteFolderRepository = new DeleteUserRepositoryImpl(deleteFolderDataSource);

export const deleteFolderUseCase = new DeleteFolderUseCaseImpl(deleteFolderRepository);
