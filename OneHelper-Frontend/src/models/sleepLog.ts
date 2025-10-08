export interface SleepRequest {
  startTime: string; // ISO date string
  endTime?: string; // ISO date string
  notes?: string;
}

export interface SleepResponse {
  startTime: string; // ISO date string
  endTime?: string; // ISO date string
  notes?: string;
  id: number;
}
