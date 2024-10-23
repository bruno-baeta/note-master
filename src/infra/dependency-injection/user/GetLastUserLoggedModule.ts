import {
    GetLastLoggedUserDataSourceImpl
} from "../../../data/data-source/user/get-last-user-logged/GetLastLoggedUserDataSourceImpl";
import {
    GetLastLoggedUserRepositoryImpl
} from "../../../data/repository/user/get-last-user-logged/GetLastLoggedUserRepositoryImpl";
import {
    GetLastLoggedUserUseCaseImpl
} from "../../../domain/usecase/user/get-last-user-logged/GetLastLoggedUserUseCaseImpl";
import {createUserUseCase} from "./CreateUserModule";
import {saveLastUserLoggedUseCase} from "./SaveLastUserLoggedModule";

const getLastUserLoggedDataSource = new GetLastLoggedUserDataSourceImpl();
const getLastUserLoggedRepository = new GetLastLoggedUserRepositoryImpl(getLastUserLoggedDataSource);

export const getLastUserLoggedUseCase =
    new GetLastLoggedUserUseCaseImpl(
        getLastUserLoggedRepository,
        saveLastUserLoggedUseCase,
        createUserUseCase
    );
