import { Module } from '@nestjs/common';
import { BloodStatService } from './blood-stat.service';
import { BloodStatController } from './blood-stat.controller';

@Module({
  controllers: [BloodStatController],
  providers: [BloodStatService],
})
export class BloodStatModule {}
