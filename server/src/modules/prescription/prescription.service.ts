import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MedicinePrescription } from 'src/modules/medicine-prescription/entities/medicine-prescription.entity';
import { MedicinePrescriptionService } from 'src/modules/medicine-prescription/medicine-prescription.service';
import { PatientService } from 'src/modules/patient/patient.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { Prescription } from './entities/prescription.entity';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: EntityRepository<Prescription>,
    private readonly patientService: PatientService,
    private readonly medicinePrescriptionService: MedicinePrescriptionService,
  ) {}

  async create(createPrescriptionDto: CreatePrescriptionDto) {
    try {
      const { patientId, medicineSchedule } = createPrescriptionDto;
      const patient = await this.patientService.findOne({ id: +patientId });
      const prescription = new Prescription(patient);

      const schedules = await this.medicinePrescriptionService.createMedicinePrescriptionList({
        prescription,
        schedules: medicineSchedule,
      });
      (schedules as MedicinePrescription[]).forEach((s) => {
        prescription.medicinePrescriptions.add(s);
      });
      await this.prescriptionRepository.persistAndFlush(prescription);
      return prescription;
    } catch (error) {
      return new Error(error);
    }
  }

  async findAllByPatient(patientId: number) {
    try {
      return await this.prescriptionRepository.find({ patient: patientId });
    } catch (error) {
      return new Error(error);
    }
  }

  async findOne(id: number) {
    const prescription = await this.prescriptionRepository.findOne(id, {
      populate: ['medicinePrescriptions'],
    });
    if (!prescription) throw new HttpException('Prescription not found', HttpStatus.BAD_REQUEST);
    return prescription;
  }

  async update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    return `This action updates a #${id} prescription`;
  }

  async remove(id: number) {
    return this.prescriptionRepository.remove({ id });
  }
}
