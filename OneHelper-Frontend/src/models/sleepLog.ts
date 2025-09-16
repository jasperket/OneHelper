export interface SleepRequest {
  startTime: string; // ISO date string
  endTime?: string; // ISO date string
  userId: number;
  note?: string;
}

export interface SleepResponse {
  startTime: string; // ISO date string
  endTime?: string; // ISO date string
  userId: number;
  note?: string;
  id: number;
}
