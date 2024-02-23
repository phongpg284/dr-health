import { useState } from "react";
import { DeviceRecordData, MaybeNull, NotificationType, PaginatedData, UseSWRReturn } from "./types";
import { useQuery } from "./use-query";
import { PatientStatEnum, getNotifications } from "./diagnostic";

type UsePatientStats = (
  patientId: MaybeNull<string>,
  initialData?: PaginatedData<DeviceRecordData[]>
) => UseSWRReturn<PaginatedData<DeviceRecordData[]>> & {
  stats: MaybeNull<PaginatedData<DeviceRecordData[]>>;
};

type UsePatientLatestStat = (
  patientId: MaybeNull<string>,
  initialData?: DeviceRecordData
) => UseSWRReturn<MaybeNull<DeviceRecordData>> & {
  stat: MaybeNull<DeviceRecordData>;
  notifications: NotificationType[];
};

export const usePatientStats: UsePatientStats = (patientId, initialData) => {
  const { data, error, isLoading, isValidating, mutate } = useQuery<PaginatedData<DeviceRecordData[]>>(
    patientId ? `patient/device_records/${patientId}` : null,
    {
      revalidateIfStale: true,
      revalidateOnMount: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 3000,
      fallbackData: initialData,
    },
    undefined,
    { secured: true }
  );

  return {
    stats: data,
    isLoading,
    isValidating,
    error,
    mutate,
  };
};

export const usePatientLatestStat: UsePatientLatestStat = (patientId, initialData) => {
  const [notifications, setNotifications] = useState<NotificationType[]>();
  const { data, error, isLoading, isValidating, mutate } = useQuery<MaybeNull<DeviceRecordData>>(
    patientId ? `patient/device_records_latest/${patientId}` : null,
    {
      revalidateIfStale: true,
      revalidateOnMount: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 3000,
      fallbackData: initialData,
      onSuccess: (data: any) => {
        const patientStats = {
          [PatientStatEnum.HEART_BPM]: data?.data[PatientStatEnum.HEART_BPM],
          [PatientStatEnum.OXYGEN_PERCENT]: data?.data[PatientStatEnum.OXYGEN_PERCENT],
          [PatientStatEnum.TEMPERATURE]: data?.data[PatientStatEnum.TEMPERATURE],
        };
        const notis = getNotifications(patientStats);
        setNotifications(notis);
      },
    },
    undefined,
    { secured: true }
  );

  return {
    notifications,
    stat: data,
    isLoading,
    isValidating,
    error,
    mutate,
  };
};
