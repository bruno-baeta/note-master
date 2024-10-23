import { User } from '../../../../domain/models/User';

/**
 * @description Interface para atualizar um usuário no DataSource.
 *
 * @responsibility
 * - Define a operação de atualização de um usuário no banco de dados.
 * - Não faz validações ou manipulações de dados, apenas atualiza o dado.
 */
export interface UpdateUserDataSource {
    handle(user: User): Promise<void>;
}
