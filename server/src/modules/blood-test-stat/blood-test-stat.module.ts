import { Module } from '@nestjs/common';
import { BloodTestStatService } from './blood-test-stat.service';
import { BloodTestStatController } from './blood-test-stat.controller';

@Module({
  controllers: [BloodTestStatController],
  providers: [BloodTestStatService],
})
export class BloodTestStatModule {}
