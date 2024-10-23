import { Folder } from '../../../../domain/models/Folder';

/**
 * @description Interface para o repositório de obter as folders de um usuário.
 *
 * @responsibility
 * - Define a operação de obter as folders de um usuário, ajustando dados antes de passar para o DataSource.
 */
export interface GetFoldersByUserRepository {
    handle(userId: number): Promise<Folder[]>;
}
