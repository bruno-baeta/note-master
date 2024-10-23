import { UpdateUserDataSourceImpl } from "../../../data/data-source/user/update-user/UpdateUserDataSourceImpl";
import { UpdateUserRepositoryImpl } from "../../../data/repository/user/update-user/UpdateUserRepositoryImpl";
import { UpdateUserUseCaseImpl } from "../../../domain/usecase/user/update-user/UpdateUserUseCaseImpl";

const updateUserDataSource = new UpdateUserDataSourceImpl();
const updateUserRepository = new UpdateUserRepositoryImpl(updateUserDataSource);

export const updateUserUseCase = new UpdateUserUseCaseImpl(updateUserRepository);
