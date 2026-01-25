/**
 * IndexedDB wrapper for offline GPS tracking storage
 * Stores GPS points locally and syncs to server when online
 */

export interface GPSPoint {
  id?: string; // local ID (auto-generated)
  entityId: string; // visit/session ID being tracked
  entityType: string; // 'monitoring_visit', 'mentoring_visit', etc.
  userId: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  speed?: number;
  heading?: number;
  timestamp: number; // Unix timestamp in milliseconds
  synced: boolean;
  createdAt: number; // when stored in IndexedDB
}

const DB_NAME = 'TaleemHubGPSTracking';
const DB_VERSION = 1;
const STORE_NAME = 'gps_points';

class OfflineStorage {
  private db: IDBDatabase | null = null;
  private initPromise: Promise<void> | null = null;

  /**
   * Initialize IndexedDB
   */
  async init(): Promise<void> {
    if (this.db) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('Failed to open IndexedDB:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('IndexedDB initialized successfully');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create GPS points object store
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const objectStore = db.createObjectStore(STORE_NAME, {
            keyPath: 'id',
            autoIncrement: true
          });

          // Create indexes for efficient querying
          objectStore.createIndex('entityId', 'entityId', { unique: false });
          objectStore.createIndex('timestamp', 'timestamp', { unique: false });
          objectStore.createIndex('synced', 'synced', { unique: false });
          objectStore.createIndex('userId', 'userId', { unique: false });

          console.log('GPS tracking object store created');
        }
      };
    });

    return this.initPromise;
  }

  /**
   * Store a GPS point
   */
  async storePoint(point: Omit<GPSPoint, 'id' | 'createdAt'>): Promise<void> {
    await this.init();
    if (!this.db) throw new Error('Database not initialized');

    const fullPoint: Omit<GPSPoint, 'id'> = {
      ...point,
      createdAt: Date.now()
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(fullPoint);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Store multiple GPS points in batch
   */
  async storeBatch(points: Omit<GPSPoint, 'id' | 'createdAt'>[]): Promise<void> {
    await this.init();
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      let completed = 0;
      let hasError = false;

      points.forEach(point => {
        const fullPoint: Omit<GPSPoint, 'id'> = {
          ...point,
          createdAt: Date.now()
        };

        const request = store.add(fullPoint);

        request.onsuccess = () => {
          completed++;
          if (completed === points.length && !hasError) {
            resolve();
          }
        };

        request.onerror = () => {
          if (!hasError) {
            hasError = true;
            reject(request.error);
          }
        };
      });
    });
  }

  /**
   * Get all unsynced points
   */
  async getUnsyncedPoints(): Promise<GPSPoint[]> {
    await this.init();
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('synced');
      const request = index.getAll(false); // get all where synced = false

      request.onsuccess = () => resolve(request.result as GPSPoint[]);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get points for a specific entity
   */
  async getPointsForEntity(entityId: string): Promise<GPSPoint[]> {
    await this.init();
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('entityId');
      const request = index.getAll(entityId);

      request.onsuccess = () => resolve(request.result as GPSPoint[]);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Mark points as synced
   */
  async markAsSynced(pointIds: number[]): Promise<void> {
    await this.init();
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      let completed = 0;
      let hasError = false;

      pointIds.forEach(id => {
        const getRequest = store.get(id);

        getRequest.onsuccess = () => {
          const point = getRequest.result as GPSPoint;
          if (point) {
            point.synced = true;
            const updateRequest = store.put(point);

            updateRequest.onsuccess = () => {
              completed++;
              if (completed === pointIds.length && !hasError) {
                resolve();
              }
            };

            updateRequest.onerror = () => {
              if (!hasError) {
                hasError = true;
                reject(updateRequest.error);
              }
            };
          }
        };

        getRequest.onerror = () => {
          if (!hasError) {
            hasError = true;
            reject(getRequest.error);
          }
        };
      });
    });
  }

  /**
   * Delete synced points older than specified days
   */
  async cleanupOldPoints(daysOld: number = 30): Promise<number> {
    await this.init();
    if (!this.db) throw new Error('Database not initialized');

    const cutoffTime = Date.now() - (daysOld * 24 * 60 * 60 * 1000);

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.openCursor();

      let deletedCount = 0;

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;

        if (cursor) {
          const point = cursor.value as GPSPoint;

          // Delete if synced and older than cutoff
          if (point.synced && point.createdAt < cutoffTime) {
            cursor.delete();
            deletedCount++;
          }

          cursor.continue();
        } else {
          // No more entries
          resolve(deletedCount);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get total count of points
   */
  async getCount(): Promise<number> {
    await this.init();
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.count();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Clear all GPS points (use with caution!)
   */
  async clearAll(): Promise<void> {
    await this.init();
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Close database connection
   */
  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
      this.initPromise = null;
    }
  }
}

// Singleton instance
export const offlineStorage = new OfflineStorage();
