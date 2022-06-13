import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { Patient } from './entities/patient.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [User, Patient],
    }),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
