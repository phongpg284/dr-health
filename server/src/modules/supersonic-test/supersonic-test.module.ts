import { Module } from '@nestjs/common';
import { SupersonicTestService } from './supersonic-test.service';
import { SupersonicTestController } from './supersonic-test.controller';

@Module({
  controllers: [SupersonicTestController],
  providers: [SupersonicTestService],
})
export class SupersonicTestModule {}
