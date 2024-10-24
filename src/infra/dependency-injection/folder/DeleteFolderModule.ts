import {DeleteFolderUseCaseImpl} from "../../../domain/usecase/folder/delete-folder/DeleteFolderUseCaseImpl";
import {DeleteFolderDataSourceImpl} from "../../../data/data-source/folder/delete-folder/DeleteFolderDataSourceImpl";
import {DeleteFolderRepositoryImpl} from "../../../data/repository/folder/delete-folder/DeleteFolderRepositoryImpl";
import {GetSubfoldersDataSourceImpl} from "../../../data/data-source/folder/get-subfolders/GetSubfoldersDataSourceImpl";

const deleteFolderDataSource = new DeleteFolderDataSourceImpl();
const getSubfoldersDataSource = new GetSubfoldersDataSourceImpl();
const deleteFolderRepository = new DeleteFolderRepositoryImpl(deleteFolderDataSource, getSubfoldersDataSource);

export const deleteFolderUseCase = new DeleteFolderUseCaseImpl(deleteFolderRepository);
