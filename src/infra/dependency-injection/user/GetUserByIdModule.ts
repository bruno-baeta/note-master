import {
    GetLastLoggedUserDataSourceImpl
} from "../../../data/data-source/user/get-last-user-logged/GetLastLoggedUserDataSourceImpl";
import {GetUserByIdRepositoryImpl} from "../../../data/repository/user/get-user-by-id/GetUserByIdRepositoryImpl";
import {GetUserByIdUseCaseImpl} from "../../../domain/usecase/user/get-user-by-id/GetUserByIdUseCaseImpl";

const getUserByIdDataSource = new GetLastLoggedUserDataSourceImpl();
const getUserByIdRepository = new GetUserByIdRepositoryImpl(getUserByIdDataSource);

export const getUserByIdUseCase = new GetUserByIdUseCaseImpl(getUserByIdRepository);
