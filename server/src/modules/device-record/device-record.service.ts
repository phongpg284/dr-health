import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { DeviceRecord } from './device-record.entity';

@Injectable()
export class DeviceRecordService {
  constructor(
    @InjectRepository(DeviceRecord)
    private readonly deviceRecordRepository: EntityRepository<DeviceRecord>,
  ) {}

  async create(data: DeviceRecord) {
    try {
      this.deviceRecordRepository.create(data);
    } catch (error) {}
  }

  async remove(id: number) {
    return this.deviceRecordRepository.remove({ id });
  }
}
