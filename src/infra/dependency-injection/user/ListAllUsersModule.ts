import {ListAllUsersRepositoryImpl} from "../../../data/repository/user/list-all-users/ListAllUsersRepositoryImpl";
import {ListAllUsersDataSourceImpl} from "../../../data/data-source/user/list-all-users/ListAllUsersDataSourceImpl";
import {ListAllUsersUseCaseImpl} from "../../../domain/usecase/user/list-all-users/ListAllUsersUseCaseImpl";

const listAllUsersDataSource = new ListAllUsersDataSourceImpl();
const listAllUsersRepository = new ListAllUsersRepositoryImpl(listAllUsersDataSource);

export const listAllUsersUseCase = new ListAllUsersUseCaseImpl(listAllUsersRepository);
