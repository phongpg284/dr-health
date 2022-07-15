import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MedicinePrescription } from 'src/medicine-prescription/entities/medicine-prescription.entity';
import { PatientService } from 'src/patient/patient.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { Prescription } from './entities/prescription.entity';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: EntityRepository<Prescription>,
    private readonly patientService: PatientService,
  ) {}

  async create(createPrescriptionDto: CreatePrescriptionDto) {
    try {
      const { patientId, medicinePescriptions } = createPrescriptionDto;
      const patient = await this.patientService.findOne({ id: +patientId });
      const prescription = new Prescription(patient);
      medicinePescriptions.forEach(({ medicine, quantity, time }) => {
        const medicinePrescription = new MedicinePrescription(prescription, medicine, quantity, time);
        prescription.medicinePrescriptions.add(medicinePrescription);
      });
      await this.prescriptionRepository.flush();
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
    const prescription = await this.prescriptionRepository.findOne(id);
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
