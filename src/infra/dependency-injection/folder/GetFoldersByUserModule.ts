import {
    GetFoldersByUserDataSourceImpl
} from "../../../data/data-source/folder/get-folders-by-user/GetFoldersByUserDataSourceImpl";
import {
    GetFoldersByUserRepositoryImpl
} from "../../../data/repository/folder/get-folders-by-user/GetFoldersByUserRepositoryImpl";
import {GetUserFoldersUseCaseImpl} from "../../../domain/usecase/folder/get-folders-by-user/GetFoldersByUserImpl";

const getFoldersByUserDataSource = new GetFoldersByUserDataSourceImpl();
const getFoldersByUserRepository = new GetFoldersByUserRepositoryImpl(getFoldersByUserDataSource);

export const getFoldersByUserUseCase = new GetUserFoldersUseCaseImpl(getFoldersByUserRepository);
