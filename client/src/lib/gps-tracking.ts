/**
 * GPS Tracking Service
 * Continuously tracks user location and stores points offline
 */

import { offlineStorage, type GPSPoint } from './offline-storage';

export type TrackingStatus = 'idle' | 'tracking' | 'paused' | 'error';

export interface TrackingSession {
  entityId: string;
  entityType: string;
  userId: string;
  startTime: number;
  lastPointTime: number;
  pointCount: number;
}

class GPSTrackingService {
  private watchId: number | null = null;
  private session: TrackingSession | null = null;
  private intervalId: NodeJS.Timeout | null = null;
  private status: TrackingStatus = 'idle';
  private listeners: Array<(status: TrackingStatus) => void> = [];
  private lastPosition: GeolocationPosition | null = null;

  // Tracking configuration
  private readonly TRACKING_INTERVAL = 30000; // 30 seconds
  private readonly HIGH_ACCURACY = true;
  private readonly MAX_AGE = 5000; // 5 seconds
  private readonly TIMEOUT = 10000; // 10 seconds

  /**
   * Check if geolocation is supported
   */
  isSupported(): boolean {
    return 'geolocation' in navigator;
  }

  /**
   * Check if currently tracking
   */
  isTracking(): boolean {
    return this.status === 'tracking';
  }

  /**
   * Get current tracking status
   */
  getStatus(): TrackingStatus {
    return this.status;
  }

  /**
   * Get current session info
   */
  getSession(): TrackingSession | null {
    return this.session;
  }

  /**
   * Add status listener
   */
  addStatusListener(listener: (status: TrackingStatus) => void): void {
    this.listeners.push(listener);
  }

  /**
   * Remove status listener
   */
  removeStatusListener(listener: (status: TrackingStatus) => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  /**
   * Notify status change
   */
  private notifyStatusChange(status: TrackingStatus): void {
    this.status = status;
    this.listeners.forEach(listener => listener(status));
  }

  /**
   * Start tracking for an entity
   */
  async startTracking(
    entityId: string,
    entityType: string,
    userId: string
  ): Promise<void> {
    if (!this.isSupported()) {
      throw new Error('Geolocation is not supported by this browser');
    }

    if (this.isTracking()) {
      console.warn('Already tracking, stopping previous session');
      await this.stopTracking();
    }

    // Initialize session
    this.session = {
      entityId,
      entityType,
      userId,
      startTime: Date.now(),
      lastPointTime: 0,
      pointCount: 0
    };

    // Save session to localStorage for persistence
    localStorage.setItem('gps_tracking_session', JSON.stringify(this.session));

    this.notifyStatusChange('tracking');

    // Request permission and get initial position
    try {
      await this.captureCurrentPosition();

      // Set up continuous watching
      this.startContinuousTracking();

      console.log(`GPS tracking started for ${entityType}:${entityId}`);
    } catch (error) {
      console.error('Failed to start tracking:', error);
      this.notifyStatusChange('error');
      throw error;
    }
  }

  /**
   * Set up continuous position tracking
   */
  private startContinuousTracking(): void {
    // Use watchPosition for continuous tracking
    this.watchId = navigator.geolocation.watchPosition(
      (position) => this.handlePositionUpdate(position),
      (error) => this.handlePositionError(error),
      {
        enableHighAccuracy: this.HIGH_ACCURACY,
        maximumAge: this.MAX_AGE,
        timeout: this.TIMEOUT
      }
    );

    // Also set up interval as backup
    this.intervalId = setInterval(() => {
      this.captureCurrentPosition().catch(error => {
        console.error('Interval position capture failed:', error);
      });
    }, this.TRACKING_INTERVAL);
  }

  /**
   * Handle position update from watchPosition
   */
  private async handlePositionUpdate(position: GeolocationPosition): Promise<void> {
    if (!this.session || this.status !== 'tracking') return;

    // Check if enough time has passed since last point
    const now = Date.now();
    const timeSinceLastPoint = now - this.session.lastPointTime;

    if (timeSinceLastPoint < this.TRACKING_INTERVAL - 1000) {
      // Too soon, skip this update
      return;
    }

    await this.storePosition(position);
  }

  /**
   * Handle position error
   */
  private handlePositionError(error: GeolocationPositionError): void {
    console.error('Geolocation error:', error);

    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.error('User denied geolocation permission');
        this.notifyStatusChange('error');
        break;
      case error.POSITION_UNAVAILABLE:
        console.error('Position unavailable');
        // Don't change status, might recover
        break;
      case error.TIMEOUT:
        console.error('Geolocation timeout');
        // Don't change status, might recover
        break;
    }
  }

  /**
   * Capture current position
   */
  private async captureCurrentPosition(): Promise<void> {
    if (!this.session) return;

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await this.storePosition(position);
          resolve();
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: this.HIGH_ACCURACY,
          maximumAge: this.MAX_AGE,
          timeout: this.TIMEOUT
        }
      );
    });
  }

  /**
   * Store position to IndexedDB
   */
  private async storePosition(position: GeolocationPosition): Promise<void> {
    if (!this.session) return;

    this.lastPosition = position;

    const point: Omit<GPSPoint, 'id' | 'createdAt'> = {
      entityId: this.session.entityId,
      entityType: this.session.entityType,
      userId: this.session.userId,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      altitude: position.coords.altitude ?? undefined,
      speed: position.coords.speed ?? undefined,
      heading: position.coords.heading ?? undefined,
      timestamp: position.timestamp,
      synced: false
    };

    try {
      await offlineStorage.storePoint(point);

      this.session.lastPointTime = Date.now();
      this.session.pointCount++;

      // Update localStorage
      localStorage.setItem('gps_tracking_session', JSON.stringify(this.session));

      console.log(`GPS point stored (${this.session.pointCount}):`, {
        lat: point.latitude,
        lng: point.longitude,
        accuracy: point.accuracy
      });
    } catch (error) {
      console.error('Failed to store GPS point:', error);
    }
  }

  /**
   * Stop tracking
   */
  async stopTracking(): Promise<void> {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }

    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    // Capture one final position before stopping
    if (this.session && this.status === 'tracking') {
      try {
        await this.captureCurrentPosition();
      } catch (error) {
        console.error('Failed to capture final position:', error);
      }
    }

    this.session = null;
    localStorage.removeItem('gps_tracking_session');

    this.notifyStatusChange('idle');
    console.log('GPS tracking stopped');
  }

  /**
   * Pause tracking (keeps session but stops collecting points)
   */
  pauseTracking(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }

    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.notifyStatusChange('paused');
    console.log('GPS tracking paused');
  }

  /**
   * Resume tracking (continues existing session)
   */
  async resumeTracking(): Promise<void> {
    if (!this.session) {
      throw new Error('No active session to resume');
    }

    this.notifyStatusChange('tracking');

    try {
      await this.captureCurrentPosition();
      this.startContinuousTracking();
      console.log('GPS tracking resumed');
    } catch (error) {
      console.error('Failed to resume tracking:', error);
      this.notifyStatusChange('error');
      throw error;
    }
  }

  /**
   * Resume tracking from localStorage (for app restart)
   */
  async restoreSession(): Promise<boolean> {
    const sessionData = localStorage.getItem('gps_tracking_session');

    if (!sessionData) {
      return false;
    }

    try {
      this.session = JSON.parse(sessionData);

      if (this.session) {
        console.log('Restoring GPS tracking session:', this.session);
        await this.resumeTracking();
        return true;
      }
    } catch (error) {
      console.error('Failed to restore session:', error);
      localStorage.removeItem('gps_tracking_session');
    }

    return false;
  }

  /**
   * Get last known position
   */
  getLastPosition(): GeolocationPosition | null {
    return this.lastPosition;
  }
}

// Singleton instance
export const gpsTracker = new GPSTrackingService();
