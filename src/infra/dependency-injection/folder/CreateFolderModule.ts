import {CreateFolderDataSourceImpl} from "../../../data/data-source/folder/create-folder/CreateFolderDataSourceImpl";
import {CreateFolderRepositoryImpl} from "../../../data/repository/folder/create-folder/CreateFolderRepositoryImpl";
import {CreateFolderUseCaseImpl} from "../../../domain/usecase/folder/create-folder/CreateFolderUseCaseImpl";

const createFolderDataSource = new CreateFolderDataSourceImpl();
const createFolderRepository = new CreateFolderRepositoryImpl(createFolderDataSource);

export const createFolderUseCase = new CreateFolderUseCaseImpl(createFolderRepository);
