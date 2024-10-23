import { User } from '../../../models/User';

/**
 * @description Interface para o caso de uso de atualizar um usuário.
 *
 * @responsibility
 * - Define a operação de atualizar um usuário, aplicando regras de negócio e validações.
 * - Executa a lógica de negócio antes de passar os dados para o repositório.
 */
export interface UpdateUserUseCase {
    handle(user: User): Promise<void>;
}
