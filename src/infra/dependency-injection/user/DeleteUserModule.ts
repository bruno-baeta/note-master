import { DeleteUserDataSourceImpl } from "../../../data/data-source/user/delete-user/DeleteUserDataSourceImpl";
import { DeleteUserRepositoryImpl } from "../../../data/repository/user/delete-user/DeleteUserRepositoryImpl";
import { DeleteUserUseCaseImpl } from "../../../domain/usecase/user/delete-user/DeleteUserUseCaseImpl";

const deleteUserDataSource = new DeleteUserDataSourceImpl();
const deleteUserRepository = new DeleteUserRepositoryImpl(deleteUserDataSource);

export const deleteUserUseCase = new DeleteUserUseCaseImpl(deleteUserRepository);
