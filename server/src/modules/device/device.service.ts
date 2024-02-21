import { EntityRepository, FilterQuery, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PatientService } from 'src/modules/patient/patient.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: EntityRepository<Device>,
    private readonly patientService: PatientService,
  ) {}

  async create(createDeviceDto: CreateDeviceDto) {
    const { name, code, isConnect, patientId } = createDeviceDto;
    try {
      const newDevice = new Device();
      newDevice.name = name;
      newDevice.type = 'medical';
      newDevice.code = code;
      newDevice.isConnect = isConnect ?? false;
      newDevice.patient = await this.patientService.findOne(+patientId);
      await this.deviceRepository.persistAndFlush(newDevice);
      this.patientService.addDevice(newDevice.id.toString(), +patientId);
      return newDevice;
    } catch (error) {
      Logger.log(`Error create device: ${error}`);
      throw new HttpException(
        {
          message: 'Error create device',
          errors: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const devices = await this.deviceRepository.findAll();
      return devices;
    } catch (error) {
      Logger.error(error);
      throw new Error(error);
    }
  }

  async findOne(params: FilterQuery<Device>) {
    const device = await this.deviceRepository.findOne(params, {
      populate: true,
    });
    return device;
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto) {
    const device = await this.deviceRepository.findOne({ id });
    wrap(device).assign(updateDeviceDto);
    await this.deviceRepository.persistAndFlush(device);
  }

  async remove(id: number) {
    return this.deviceRepository.remove({ id });
  }
}
