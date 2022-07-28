import { Module } from '@nestjs/common';
import { BloodService } from './blood.service';
import { BloodController } from './blood.controller';

@Module({
  controllers: [BloodController],
  providers: [BloodService]
})
export class BloodModule {}
