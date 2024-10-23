import { User } from '../../../../domain/models/User';

/**
 * @description Interface para obter o último usuário logado do DataSource.
 *
 * @responsibility
 * - Define a operação de obter o último usuário logado do banco de dados.
 * - Não faz validação ou manipulação, apenas busca o dado.
 */
export interface GetLastLoggedUserDataSource {
    handle(): Promise<User | undefined>;
}
