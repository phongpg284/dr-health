import { plainToClass } from 'class-transformer';

export class PatientStats {
  heart_beat_bpm: number;
  oxygen_percent: number;
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
