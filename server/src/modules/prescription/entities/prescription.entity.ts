import { Collection, Entity, ManyToOne, OneToMany } from '@mikro-orm/core';
import { MedicinePrescription } from 'src/modules/medicine-prescription/entities/medicine-prescription.entity';
import { Patient } from 'src/modules/patient/entities/patient.entity';
import { BaseEntity } from 'src/utils/BaseEntity';

@Entity()
export class Prescription extends BaseEntity {
  constructor(patient: Patient) {
    super();
    this.patient = patient;
  }
  @OneToMany(
    () => MedicinePrescription,
    (medicinePrescription) => medicinePrescription.prescription,
  )
  medicinePrescriptions = new Collection<MedicinePrescription>(this);

  @ManyToOne(() => Patient)
  patient: Patient;
}
