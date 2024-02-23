export type Response = {
  message?: string;
};

export type MaybeNull<T> = T | null;

export type UseSWRReturn<T> = {
  isLoading: boolean;
  isValidating: boolean;
  error: any;
  mutate: (optimisticData?: T | undefined) => void;
};

export enum NotificationTypeEnum {
  NORMAL = "normal",
  DANGER = "danger",
  WARNING = "warning",
}

export type NotificationType = {
  stat: PatientStatEnum;
  type: NotificationTypeEnum;
  title: string;
  message: string;
};

export type PaginatedData<T> = {
  data: T;
  totalDocument: number;
  totalPages: number;
  pageNum?: number;
  pageSize?: number;
};

export type UserToken = {
  accessToken: string;
  refreshToken: string;
};

export type DeviceRecordData = BaseData &
  PatientStats & {
    patient: number;
  };

export type PatientStats = {
  [PatientStatEnum.HEART_BPM]: number;
  [PatientStatEnum.OXYGEN_PERCENT]: number;
  [PatientStatEnum.TEMPERATURE]: number;
};

export enum PatientStatEnum {
  HEART_BPM = "heart_beat_bpm",
  OXYGEN_PERCENT = "oxygen_percent",
  TEMPERATURE = "temperature",
}

export type BaseData = {
  id: string;
  updatedAt: string;
  createdAt: string;
};
