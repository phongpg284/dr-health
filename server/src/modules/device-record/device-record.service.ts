import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateDeviceRecordDto, UpdateDeviceRecordDto } from './createDeviceRecord.dto';
import { DeviceRecord } from './device-record.entity';

@Injectable()
export class DeviceRecordService {
  constructor(
    @InjectRepository(DeviceRecord)
    private readonly deviceRecordRepository: EntityRepository<DeviceRecord>,
  ) {}

  async create(data: CreateDeviceRecordDto) {
    try {
      return this.deviceRecordRepository.create(data);
    } catch (error) {}
  }

  async findAll() {
    return this.deviceRecordRepository.findAll();
  }

  async findOne(patientId) {
    return this.deviceRecordRepository.findOne({
      medicalRecord: {
        patient: patientId,
      },
    });
  }

  async update(id, data: UpdateDeviceRecordDto) {
    return this.deviceRecordRepository.nativeUpdate({ id }, data);
  }

  async remove(id: number) {
    return this.deviceRecordRepository.remove({ id });
  }
}
