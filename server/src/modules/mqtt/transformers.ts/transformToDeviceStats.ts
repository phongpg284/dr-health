import { plainToClass } from 'class-transformer';

export class PatientStats {
  heart_rate_bpm: number;
  spo2_percentage: number;
  temperature: number;
}

export function transformToPatientStats(rawData: Record<any, any>) {
  try {
    const data = plainToClass(PatientStats, rawData);
    return data;
  } catch (error) {
    throw new Error(
      `There was a problem while transforming the raw object ${rawData}. Error: ${JSON.stringify(
        error,
      )}`,
    );
  }
}
