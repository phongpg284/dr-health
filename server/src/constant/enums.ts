import { BODY_TEMP, DIASTOLE, HEART_RATE, HUMIDITY, SPO2, SYSTOLIC, TEMPERATURE } from 'src/config/topic';

export enum Role {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  ADMIN = 'admin',
}

export const ENVIRONMENT_STATS_VN = {
  [TEMPERATURE]: 'Nhiệt độ',
  [HUMIDITY]: 'Độ ẩm',
};

export const MEDICAL_STATS_VN = {
  [SPO2]: 'SpO2',
  [HEART_RATE]: 'Nhịp tim',
  [BODY_TEMP]: 'Nhiệt độ',
  [DIASTOLE]: 'Tâm trương',
  [SYSTOLIC]: 'Tâm thu',
};
