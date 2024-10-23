import { User } from '../../../models/User';

/**
 * @description Interface para o caso de uso de buscar um usuário pelo ID.
 *
 * @responsibility
 * - Define a operação de buscar um usuário pelo ID, aplicando regras de negócio.
 * - Executa a lógica de negócio antes de passar os dados para o repositório.
 */
export interface GetUserByIdUseCase {
    handle(id: number): Promise<User | undefined>;
}
