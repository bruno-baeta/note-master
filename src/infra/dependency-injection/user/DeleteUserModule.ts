import { DeleteUserDataSourceImpl } from "../../../data/data-source/user/delete-user/DeleteUserDataSourceImpl";
import { DeleteUserRepositoryImpl } from "../../../data/repository/user/delete-user/DeleteUserRepositoryImpl";
import { DeleteUserUseCaseImpl } from "../../../domain/usecase/user/delete-user/DeleteUserUseCaseImpl";
import {
    DeleteAllUserFoldersDataSource
} from "../../../data/data-source/folder/delete-all-user-folders/DeleteAllUserFoldersDataSourceImpl";

const deleteUserDataSource = new DeleteUserDataSourceImpl();
const deleteUserFoldersDataSource = new DeleteAllUserFoldersDataSource()
const deleteUserRepository = new DeleteUserRepositoryImpl(deleteUserDataSource, deleteUserFoldersDataSource);

export const deleteUserUseCase = new DeleteUserUseCaseImpl(deleteUserRepository);
