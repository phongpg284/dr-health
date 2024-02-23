type MedicalStatsKey = "spO2" | "heart_rate" | "body_temp";
export type MedicalStat = {
  createdAt: Date;
  updatedAt: Date;
  value: string;
  secondValue?: string;
  unit: string;
};

export type GetMedicalStatsResponse = Record<MedicalStatsKey, Array<MedicalStat>>;
