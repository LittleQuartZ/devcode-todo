import { atom } from 'jotai';

export const orders = {
  latest: 'Terbaru',
  oldest: 'Terlama',
  az: 'A-Z',
  za: 'Z-A',
  active: 'Belum Selesai',
} as const;

export type OrderType = keyof typeof orders;

export const orderAtom = atom<OrderType>('latest');
