import { GetUserByIdDataSource } from './GetUserByIdDataSource';
import { User } from '../../../../domain/models/User';
import {IndexedDBManager} from "../../../IndexedDBManager";

const STORE_NAME = 'users';
const DATABASE_NAME = 'notemaster';

export class GetUserByIdDataSourceImpl implements GetUserByIdDataSource {
    private dbManager: IndexedDBManager;

    constructor() {
        this.dbManager = new IndexedDBManager(DATABASE_NAME);
    }

    async handle(id: number): Promise<User | undefined> {
        const db = await this.dbManager.getDB();
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);

        return new Promise((resolve, reject) => {
            const request = store.get(id);
            request.onsuccess = () => {
                transaction.oncomplete = () => resolve(request.result as User);
            };
            request.onerror = () => reject(request.error);
        });
    }
}
