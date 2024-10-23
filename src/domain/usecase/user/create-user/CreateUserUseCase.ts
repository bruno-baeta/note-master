import { User } from '../../../models/User';

/**
 * @description Interface para o caso de uso de adicionar usuário.
 *
 * @responsibility
 * - Define a operação de adicionar usuário, aplicando regras de negócio como validação.
 * - Executa a lógica de negócio antes de passar os dados para o repositório.
 */
export interface CreateUserUseCase {
  handle(user: User): Promise<void>;
}
