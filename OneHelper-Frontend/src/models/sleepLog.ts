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

export interface SleepAnalysisResponse {
  sleepDebt: number;
  status: string;
}

export const SleepThreshold = {
  GREEN: 0,
  YELLOW: 1,
  ORANGE: 2,
  RED: 3,
} as const;

// derive the union type (0 | 1 | 2 | 3)
export type SleepThreshold =
  (typeof SleepThreshold)[keyof typeof SleepThreshold];

export interface SleepAnalysisDto {
  sleepDebt: number;
  status: SleepThreshold;
  message?: string;
}
