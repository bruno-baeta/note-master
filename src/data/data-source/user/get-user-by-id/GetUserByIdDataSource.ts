import { User } from '../../../../domain/models/User';

/**
 * @description Interface para buscar um usuário por ID no DataSource.
 *
 * @responsibility
 * - Define a operação de busca de um usuário por ID no banco de dados.
 * - Não faz validações ou manipulações de dados, apenas busca o dado.
 */
export interface GetUserByIdDataSource {
    handle(id: number): Promise<User | undefined>;
}
