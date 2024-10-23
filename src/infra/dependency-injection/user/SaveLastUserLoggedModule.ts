import {
    SaveLastLoggedUserDataSourceImpl
} from "../../../data/data-source/user/save-last-user-logged/SaveLastLoggedUserDataSourceImpl";
import {
    SaveLastLoggedUserUseCaseImpl
} from "../../../domain/usecase/user/save-last-user-logged/SaveLastLoggedUserUseCaseImpl";
import {
    SaveLastLoggedUserRepositoryImpl
} from "../../../data/repository/user/save-last-user-logged/SaveLastLoggedUserRepositoryImpl";

const saveLastUserLoggedDataSource = new SaveLastLoggedUserDataSourceImpl();
const saveLastUserLoggedRepository = new SaveLastLoggedUserRepositoryImpl(saveLastUserLoggedDataSource);

export const saveLastUserLoggedUseCase = new SaveLastLoggedUserUseCaseImpl(saveLastUserLoggedRepository);
