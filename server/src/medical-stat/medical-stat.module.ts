import { Module } from '@nestjs/common';
import { MedicalStatService } from './medical-stat.service';
import { MedicalStatController } from './medical-stat.controller';

@Module({
  controllers: [MedicalStatController],
  providers: [MedicalStatService]
})
export class MedicalStatModule {}
