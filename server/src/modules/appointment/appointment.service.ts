import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { DoctorService } from 'src/modules/doctor/doctor.service';
import { NotificationService } from 'src/modules/notification/notification.service';
import { PatientService } from 'src/modules/patient/patient.service';
import { Schedule } from 'src/modules/schedule/entities/schedule.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: EntityRepository<Appointment>,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
    private readonly notificationService: NotificationService,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    try {
      const { patientId, doctorId, time, duration, name, link } = createAppointmentDto;
      const patient = await this.patientService.findOne({ id: +patientId });
      const doctor = await this.doctorService.findOne({ id: +doctorId });
      if (patient && doctor) {
        const newAppointment = new Appointment(patient, doctor, name, time, link, duration);
        const newScheduleForPatient = new Schedule(
          patient.account,
          'appointment',
          time,
          null,
          newAppointment,
        );
        const newScheduleForDoctor = new Schedule(
          doctor.account,
          'appointment',
          time,
          null,
          newAppointment,
        );
        newAppointment.schedules.add(newScheduleForPatient);
        newAppointment.schedules.add(newScheduleForDoctor);
        await this.appointmentRepository.persistAndFlush(newAppointment);
        await this.notificationService.create({
          patientId: +patientId,
          title: 'Cuộc hẹn với bác sĩ tạo thành công',
          content: `Bạn có cuộc hẹn với bác sĩ vào lúc ${dayjs(time).format('DD/MM/YYYY HH:mm')}`,
          type: 'appointment',
          appoinment: newAppointment,
        });
        await this.notificationService.create({
          doctorId: +doctorId,
          title: 'Cuộc hẹn với bệnh nhân tạo thành công',
          content: `Bạn có cuộc hẹn với bệnh nhân vào lúc ${dayjs(time).format(
            'DD/MM/YYYY HH:mm',
          )}`,
          type: 'appointment',
          appoinment: newAppointment,
        });
      }
    } catch (error) {
      return new Error(error);
    }
  }

  findAll() {
    return `This action returns all appointment`;
  }

  findOne(id: number) {
    return this.appointmentRepository.findOne({ id });
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
