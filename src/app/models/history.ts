import {Device} from './device';

export type History = {
  id?: number;
  bin?: Device;
  status?: boolean;
  value?: number;
  data?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deviceId?: number;
};

export type AddHistory = {
  binId: string;
  value: number;
  data: string;
};
