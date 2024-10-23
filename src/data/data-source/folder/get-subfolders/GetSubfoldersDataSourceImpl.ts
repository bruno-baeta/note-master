import { GetSubfoldersDataSource } from './GetSubfoldersDataSource';
import { Folder } from '../../../../domain/models/Folder';
import { IndexedDBManager } from '../../../IndexedDBManager';

const STORE_NAME = 'folders';
const DATABASE_NAME = 'notemaster';

export class GetSubfoldersDataSourceImpl implements GetSubfoldersDataSource {
    private dbManager: IndexedDBManager;

    constructor() {
        this.dbManager = new IndexedDBManager(DATABASE_NAME);
    }

    async handle(parentId: number): Promise<Folder[]> {
        const db = await this.dbManager.getDB();
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);

        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => {
                transaction.oncomplete = () => {
                    const subfolders = request.result.filter((folder: Folder) => folder.parentId === parentId);
                    resolve(subfolders);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }
}
