import { CreateUserUseCaseImpl } from '../../../domain/usecase/user/create-user/CreateUserUseCaseImpl';
import { CreateUserRepositoryImpl } from '../../../data/repository/user/create-user/CreateUserRepositoryImpl';
import { CreateUserDataSourceImpl } from '../../../data/data-source/user/create-user/CreateUserDataSourceImpl';

const createUserDataSource = new CreateUserDataSourceImpl();
const createUserRepository = new CreateUserRepositoryImpl(createUserDataSource);

export const createUserUseCase = new CreateUserUseCaseImpl(createUserRepository);
