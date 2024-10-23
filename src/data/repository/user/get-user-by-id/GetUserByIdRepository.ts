import { User } from '../../../../domain/models/User';

/**
 * @description Interface para o repositório de buscar usuário por ID.
 *
 * @responsibility
 * - Define a operação de buscar usuário por ID, ajustando ou convertendo os dados antes de passar para a camada superior.
 * - Pode realizar validações básicas ou ajustes de formato de dados.
 */
export interface GetUserByIdRepository {
    handle(id: number): Promise<User | undefined>;
}
