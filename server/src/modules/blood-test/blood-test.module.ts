import { Module } from '@nestjs/common';
import { BloodTestService } from './blood-test.service';
import { BloodTestController } from './blood-test.controller';

@Module({
  controllers: [BloodTestController],
  providers: [BloodTestService],
})
export class BloodTestModule {}
