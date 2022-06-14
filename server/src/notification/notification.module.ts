import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { OrmModule } from 'src/orm/orm.module';

@Module({
  imports: [OrmModule],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
