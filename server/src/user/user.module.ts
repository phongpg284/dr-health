import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { OrmModule } from 'src/orm/orm.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [OrmModule, NotificationModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
