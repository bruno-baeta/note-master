import { User } from '../../../../domain/models/User';

/**
 * @description Interface para salvar o último usuário logado no DataSource.
 *
 * @responsibility
 * - Define a operação de salvar o último usuário logado no banco de dados.
 * - Não faz validação ou manipulação, apenas persistência.
 */
export interface SaveLastLoggedUserDataSource {
    handle(user: User): Promise<void>;
}
