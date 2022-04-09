import { scheduledJobs, scheduleJob } from 'node-schedule';
import { logger } from '../config/logger';
import { mqttPublishSchedule } from '../mqtt/handler';
/**
 * Set new Schedule Job
 * @param job Callback function Task execcute
 * @param name Schedule Job codename (patientId_medicineName_ScheduleDate)
 * @param date Schedule Date
 * @returns
 */
export const SetScheduleJob = (
  medicineName: string,
  note: string | undefined,
  deviceId: string,
  name: string,
  date: Date
) => {
  return scheduleJob(name, date, function () {
    mqttPublishSchedule(medicineName, note, deviceId).then(() =>
      logger.info('Schedule activate!')
    );
  });
};

/**
 * Cancel Schedule Job
 * @param name Schedule Job codename (patientId_medicineName_ScheduleDate)
 * @returns
 */
export const CancelScheduleJob = (name: string) => {
  if (!scheduledJobs[name]) {
    logger.error('No job: ', name);
    return;
  }
  scheduledJobs[name].cancel();
};
