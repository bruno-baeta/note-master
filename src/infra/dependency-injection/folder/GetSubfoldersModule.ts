import { GetUserFoldersUseCaseImpl } from "../../../domain/usecase/folder/get-folders-by-user/GetFoldersByUserImpl";
import { GetSubfoldersDataSourceImpl } from "../../../data/data-source/folder/get-subfolders/GetSubfoldersDataSourceImpl";
import { GetSubfoldersRepositoryImpl } from "../../../data/repository/folder/get-subfolders/GetSubfoldersRepositoryImpl";

const getSubfoldersDataSource = new GetSubfoldersDataSourceImpl();
const getSubfoldersRepository = new GetSubfoldersRepositoryImpl(getSubfoldersDataSource);

export const getSubfoldersUseCase = new GetUserFoldersUseCaseImpl(getSubfoldersRepository);
