import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/user/entities/user.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Doctor } from './entities/doctor.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [User, Patient, Doctor],
    }),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
