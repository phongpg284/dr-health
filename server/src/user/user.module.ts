import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Patient } from 'src/patient/entities/patient.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [User, Patient, Doctor],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
