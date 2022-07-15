import { Module } from '@nestjs/common';
import { MedicalThresholdService } from './medical-threshold.service';
import { MedicalThresholdController } from './medical-threshold.controller';
import { OrmModule } from 'src/orm/orm.module';

@Module({
  imports: [OrmModule],
  controllers: [MedicalThresholdController],
  providers: [MedicalThresholdService],
  exports: [MedicalThresholdService],
})
export class MedicalThresholdModule {}
