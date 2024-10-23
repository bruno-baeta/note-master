import { DeleteFolderDataSource } from './DeleteFolderDataSource';
import {IndexedDBManager} from "../../../IndexedDBManager";

const STORE_NAME = 'folders';
const DATABASE_NAME = 'notemaster';

export class DeleteFolderDataSourceImpl implements DeleteFolderDataSource {
    private dbManager: IndexedDBManager;

    constructor() {
        this.dbManager = new IndexedDBManager(DATABASE_NAME);
    }

    async handle(folderId: number): Promise<void> {
        const db = await this.dbManager.getDB();
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(folderId);

        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
}
