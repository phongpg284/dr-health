type MedicalStatsKey = 'spO2' | 'heart_rate' | 'body_temp' | 'diastole' | 'systolic'
type MedicalStat = {
    createdAt: Date;
    updatedAt: Date;
    value: string;
    unit: string;
}

export type GetMedicalStatsResponse = Record<MedicalStatsKey, Array<MedicalStat>>;
