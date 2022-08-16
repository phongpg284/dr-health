import { Module } from '@nestjs/common';
import { MedicalStatService } from './medical-stat.service';
import { MedicalStatController } from './medical-stat.controller';
import { OrmModule } from 'src/orm/orm.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [OrmModule, EventsModule],
  controllers: [MedicalStatController],
  providers: [MedicalStatService],
  exports: [MedicalStatService],
})
export class MedicalStatModule {}
