import { DeleteUserDataSource } from './DeleteUserDataSource';
import {IndexedDBManager} from "../../../IndexedDBManager";

const STORE_NAME = 'users';
const DATABASE_NAME = 'notemaster';

export class DeleteUserDataSourceImpl implements DeleteUserDataSource {
    private dbManager: IndexedDBManager;

    constructor() {
        this.dbManager = new IndexedDBManager(DATABASE_NAME);
    }

    async handle(id: number): Promise<void> {
        const db = await this.dbManager.getDB();
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);

        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                transaction.oncomplete = () => resolve();
            };
            request.onerror = () => reject(request.error);
        });
    }
}
