export const getBMI = (height: number, weight: number) => {
  return weight / (height * height);
};

export const getDiagnostic = (BMI: number) => {
  if (BMI < 18.5) return "Gầy";
  else if (BMI < 22.9) return "Bình thường";
  else if (BMI <= 24.9) return "Tiền béo phì";
  else if (BMI <= 29.9) return "Béo phì độ I";
  else return "Béo phì độ II";
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

const normalThreshold = {
  [PatientStatEnum.HEART_BPM]: {
    min: 60,
    max: 80,
  },
  [PatientStatEnum.OXYGEN_PERCENT]: {
    min: 97,
    max: 99,
  },
  [PatientStatEnum.TEMPERATURE]: {
    min: 36.5,
    max: 37,
  },
};

const notificationMap = {
  [PatientStatEnum.HEART_BPM]: {
    title: "Cảnh báo nhịp tim bất thường",
    message: {
      min: "Nhịp tim thấp hơn bình thường",
      max: "Nhịp tim tăng cao, bạn cần nghỉ ngơi",
    },
  },
  [PatientStatEnum.OXYGEN_PERCENT]: {
    title: "Cảnh báo nồng độ oxy máu bất thường",
    message: {
      min: "Nồng độ oxy cao hơn bình thường, bạn có thể cần thở thêm oxy",
      max: "Nồng độ oxy tăng cao, bạn cần nghỉ ngơi",
    },
  },
  [PatientStatEnum.TEMPERATURE]: {
    title: "Cảnh báo nhiệt độ cơ thể bất thường",
    message: {
      min: "Nhiệt độ thấp hơn bình thường, bạn có nguy cơ cảm lạnh",
      max: "Nhịp độ cao hơn bình thường, bạn có nguy cơ bị sốt",
    },
  },
};

export const getNotifications = (stats: PatientStats) => {
  const notifications: NotificationType[] = [];

  const analyzeStat = (field: PatientStatEnum, value: number) => {
    if (value > normalThreshold[field].max) {
      notifications.push({
        stat: field,
        type: NotificationTypeEnum.WARNING,
        title: notificationMap[field].title,
        message: notificationMap[field].message.max,
      });
    } else if (value < normalThreshold[field].min) {
      notifications.push({
        stat: field,
        type: NotificationTypeEnum.WARNING,
        title: notificationMap[field].title,
        message: notificationMap[field].message.min,
      });
    }
  };

  Object.keys(stats).forEach((key) => {
    analyzeStat(key as unknown as PatientStatEnum, stats[key as unknown as PatientStatEnum] as unknown as number);
  });

  return notifications;
};
