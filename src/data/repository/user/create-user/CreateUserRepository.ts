import { User } from '../../../../domain/models/User';

/**
 * @description Interface para o repositório de adicionar usuário.
 *
 * @responsibility
 * - Define a operação de adicionar usuário, manipulando ou ajustando dados antes de passar para o DataSource.
 * - Pode realizar pequenas manipulações, como adicionar campos `createdAt`, converter dados que o banco espera.
 */
export interface CreateUserRepository {
    handle(user: User): Promise<void>;
}