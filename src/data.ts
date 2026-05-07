import { Reservoir } from './types';

export const reservoirs: Reservoir[] = [
  {
    id: 'shanxi',
    name: '珊溪水库 (Shanxi)',
    location: { lat: 27.8188, lng: 119.9866 },
    waterLevel: 142.5,
    limitLevel: 145.0,
    rainfall24h: 12.5,
    status: 'normal',
    updatedAt: new Date().toISOString(),
    capacity: 1824,
  },
  {
    id: 'zeya',
    name: '泽雅水库 (Zeya)',
    location: { lat: 28.0289, lng: 120.4578 },
    waterLevel: 88.2,
    limitLevel: 92.0,
    rainfall24h: 45.8,
    status: 'warning',
    updatedAt: new Date().toISOString(),
    capacity: 57.9,
  },
  {
    id: 'zhaoshandu',
    name: '赵山渡水库 (Zhaoshandu)',
    location: { lat: 27.9452, lng: 120.3211 },
    waterLevel: 21.5,
    limitLevel: 22.0,
    rainfall24h: 15.2,
    status: 'normal',
    updatedAt: new Date().toISOString(),
    capacity: 34.1,
  },
  {
    id: 'baizhangji',
    name: '百丈漈水库 (Baizhangji)',
    location: { lat: 27.8542, lng: 120.0123 },
    waterLevel: 625.4,
    limitLevel: 628.0,
    rainfall24h: 8.4,
    status: 'normal',
    updatedAt: new Date().toISOString(),
    capacity: 12.5,
  },
  {
    id: '仰义',
    name: '仰义水库 (Yangyi)',
    location: { lat: 28.0567, lng: 120.5890 },
    waterLevel: 28.9,
    limitLevel: 30.0,
    rainfall24h: 5.2,
    status: 'normal',
    updatedAt: new Date().toISOString(),
    capacity: 3.5,
  }
];

export const mockTimeSeries = (id: string) => {
  const points = [];
  const now = new Date();
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000);
    points.push({
      time: time.getHours() + ':00',
      value: 140 + Math.random() * 5,
    });
  }
  return points;
};
