import {
  BLOOD_PRESS,
  BODY_TEMP,
  DIASTOLE,
  HEART_RATE,
  HUMIDITY,
  SPO2,
  SYSTOLIC,
  TEMPERATURE,
} from 'src/config/topic';

export enum Role {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  ADMIN = 'admin',
}

export const ENVIRONMENT_STATS = {
  [TEMPERATURE]: {
    label: 'Nhiệt độ',
    type: 'temperature',
  },
  [HUMIDITY]: {
    label: 'Độ ẩm',
    type: 'humidity',
  },
};

export const MEDICAL_STATS = {
  [SPO2]: {
    label: 'SpO2',
    type: 'spO2',
  },
  [HEART_RATE]: {
    label: 'Nhịp tim',
    type: 'heart_rate',
  },
  [BODY_TEMP]: {
    label: 'Nhiệt độ',
    type: 'body_temp',
  },
  [BLOOD_PRESS]: {
    label: 'Huyết áp',
    type: 'blood_press',
  },
  [DIASTOLE]: {
    label: 'Tâm trương',
    type: 'diastole',
  },
  [SYSTOLIC]: {
    label: 'Tâm thu',
    type: 'systolic',
  },
};
