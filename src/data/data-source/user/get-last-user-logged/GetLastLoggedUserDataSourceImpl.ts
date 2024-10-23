import { GetLastLoggedUserDataSource } from './GetLastLoggedUserDataSource';
import { User } from '../../../../domain/models/User';
import { IndexedDBManager } from '../../../IndexedDBManager';

const STORE_NAME = 'loggedUser';
const DATABASE_NAME = 'notemaster';

export class GetLastLoggedUserDataSourceImpl implements GetLastLoggedUserDataSource {
    private dbManager: IndexedDBManager;

    constructor() {
        this.dbManager = new IndexedDBManager(DATABASE_NAME);
    }

    async handle(): Promise<User | undefined> {
        const db = await this.dbManager.getDB();
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get('lastLogged');

        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                transaction.oncomplete = () => resolve(request.result as User);
            };
            request.onerror = () => reject(request.error);
        });
    }
}
