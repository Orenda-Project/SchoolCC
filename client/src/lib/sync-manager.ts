/**
 * Sync Manager
 * Automatically syncs offline GPS data to server when connection is available
 */

import { offlineStorage, type GPSPoint } from './offline-storage';

class SyncManager {
  private syncInProgress = false;
  private syncInterval: NodeJS.Timeout | null = null;
  private listeners: Array<(status: 'syncing' | 'success' | 'error', count?: number) => void> = [];

  // Sync configuration
  private readonly SYNC_INTERVAL = 60000; // 1 minute
  private readonly BATCH_SIZE = 50; // sync 50 points at a time
  private readonly MAX_RETRIES = 3;

  /**
   * Initialize sync manager
   */
  init(): void {
    // Start periodic sync
    this.startPeriodicSync();

    // Listen for online/offline events
    window.addEventListener('online', () => {
      console.log('Network connection restored, triggering sync');
      this.syncNow();
    });

    window.addEventListener('offline', () => {
      console.log('Network connection lost');
    });

    // Sync on page visibility change (user returns to tab)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && navigator.onLine) {
        this.syncNow();
      }
    });

    console.log('Sync manager initialized');
  }

  /**
   * Start periodic background sync
   */
  private startPeriodicSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }

    this.syncInterval = setInterval(() => {
      if (navigator.onLine && !this.syncInProgress) {
        this.syncNow();
      }
    }, this.SYNC_INTERVAL);
  }

  /**
   * Stop periodic sync
   */
  stopPeriodicSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  /**
   * Add sync status listener
   */
  addListener(listener: (status: 'syncing' | 'success' | 'error', count?: number) => void): void {
    this.listeners.push(listener);
  }

  /**
   * Remove sync status listener
   */
  removeListener(listener: (status: 'syncing' | 'success' | 'error', count?: number) => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  /**
   * Notify listeners of sync status
   */
  private notify(status: 'syncing' | 'success' | 'error', count?: number): void {
    this.listeners.forEach(listener => listener(status, count));
  }

  /**
   * Trigger immediate sync
   */
  async syncNow(): Promise<void> {
    if (this.syncInProgress) {
      console.log('Sync already in progress, skipping');
      return;
    }

    if (!navigator.onLine) {
      console.log('Device is offline, skipping sync');
      return;
    }

    this.syncInProgress = true;
    this.notify('syncing');

    try {
      const unsyncedPoints = await offlineStorage.getUnsyncedPoints();

      if (unsyncedPoints.length === 0) {
        console.log('No GPS points to sync');
        this.syncInProgress = false;
        return;
      }

      console.log(`Syncing ${unsyncedPoints.length} GPS points...`);

      // Sync in batches
      let syncedCount = 0;
      for (let i = 0; i < unsyncedPoints.length; i += this.BATCH_SIZE) {
        const batch = unsyncedPoints.slice(i, i + this.BATCH_SIZE);
        const batchSynced = await this.syncBatch(batch);
        syncedCount += batchSynced;
      }

      console.log(`Successfully synced ${syncedCount}/${unsyncedPoints.length} GPS points`);

      // Cleanup old synced points (older than 30 days)
      const deletedCount = await offlineStorage.cleanupOldPoints(30);
      if (deletedCount > 0) {
        console.log(`Cleaned up ${deletedCount} old GPS points`);
      }

      this.notify('success', syncedCount);
    } catch (error) {
      console.error('Sync failed:', error);
      this.notify('error');
    } finally {
      this.syncInProgress = false;
    }
  }

  /**
   * Sync a batch of points
   */
  private async syncBatch(points: GPSPoint[]): Promise<number> {
    let retries = 0;
    let lastError: Error | null = null;

    while (retries < this.MAX_RETRIES) {
      try {
        // Convert points to server format
        const serverPoints = points.map(point => ({
          entityId: point.entityId,
          entityType: point.entityType,
          userId: point.userId,
          latitude: point.latitude.toString(),
          longitude: point.longitude.toString(),
          accuracy: point.accuracy?.toString(),
          altitude: point.altitude?.toString(),
          speed: point.speed?.toString(),
          heading: point.heading?.toString(),
          timestamp: new Date(point.timestamp)
        }));

        // Send to server
        const response = await fetch('/api/gps-tracking/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ points: serverPoints })
        });

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const result = await response.json();

        // Mark points as synced
        const idsToMark = points
          .map(p => p.id)
          .filter((id): id is number => id !== undefined);

        await offlineStorage.markAsSynced(idsToMark);

        return result.syncedCount || points.length;
      } catch (error) {
        lastError = error as Error;
        retries++;

        if (retries < this.MAX_RETRIES) {
          // Exponential backoff
          const delay = Math.pow(2, retries) * 1000;
          console.log(`Sync retry ${retries}/${this.MAX_RETRIES} after ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    // All retries failed
    throw lastError || new Error('Sync failed after all retries');
  }

  /**
   * Get sync statistics
   */
  async getStats(): Promise<{
    totalPoints: number;
    unsyncedPoints: number;
    syncProgress: number;
  }> {
    const totalPoints = await offlineStorage.getCount();
    const unsyncedPoints = (await offlineStorage.getUnsyncedPoints()).length;
    const syncProgress = totalPoints > 0
      ? Math.round(((totalPoints - unsyncedPoints) / totalPoints) * 100)
      : 100;

    return {
      totalPoints,
      unsyncedPoints,
      syncProgress
    };
  }

  /**
   * Check if sync is in progress
   */
  isSyncing(): boolean {
    return this.syncInProgress;
  }

  /**
   * Cleanup
   */
  destroy(): void {
    this.stopPeriodicSync();
    window.removeEventListener('online', this.syncNow);
    window.removeEventListener('offline', () => {});
    this.listeners = [];
  }
}

// Singleton instance
export const syncManager = new SyncManager();

// Auto-initialize on import
if (typeof window !== 'undefined') {
  syncManager.init();
}
