import { Module } from '@nestjs/common';
import { OrmModule } from 'src/orm/orm.module';

@Module({
  imports: [OrmModule],
})
export class AddressModule {}
