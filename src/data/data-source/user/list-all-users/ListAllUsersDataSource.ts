import { User } from '../../../../domain/models/User';

/**
 * @description Interface para buscar todos os usuários no DataSource.
 *
 * @responsibility
 * - Define a operação de listar todos os usuários no banco de dados.
 */
export interface ListAllUsersDataSource {
  handle(): Promise<User[]>;
}
