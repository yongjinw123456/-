export type ReservoirStatus = 'normal' | 'warning' | 'critical';

export interface Reservoir {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  waterLevel: number;
  limitLevel: number;
  rainfall24h: number;
  status: ReservoirStatus;
  updatedAt: string;
  capacity: number; // in million m3
}

export interface MetricPoint {
  time: string;
  value: number;
}
