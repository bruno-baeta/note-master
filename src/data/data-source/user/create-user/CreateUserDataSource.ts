import { User } from '../../../../domain/models/User';

/**
 * @description Interface para adicionar um usuário no DataSource.
 *
 * @responsibility
 * - Define a operação de adicionar usuário no banco de dados.
 * - Não faz validação ou manipulação de dados, apenas a persistência.
 */
export interface CreateUserDataSource {
    handle(user: User): Promise<void>;
}
