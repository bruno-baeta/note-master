import { Folder } from '../../../models/Folder';

/**
 * @description Interface para o caso de uso de obter as folders de um usuário.
 *
 * @responsibility
 * - Define a operação de buscar as folders de um usuário, ajustando dados e aplicando validações.
 * - Executa a lógica de negócio antes de passar os dados para o repositório.
 */
export interface GetFoldersByUser {
  handle(userId: number): Promise<Folder[]>;
}
