import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateDeviceRecordDto, UpdateDeviceRecordDto } from './createDeviceRecord.dto';
import { DeviceRecordService } from './device-record.service';

@Controller('device-record')
export class DeviceRecordController {
  constructor(private readonly deviceRecordService: DeviceRecordService) {}

  @Post()
  create(@Body() data: CreateDeviceRecordDto) {
    return this.deviceRecordService.create(data);
  }

  @Get()
  findAll() {
    return this.deviceRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceRecordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateDeviceRecordDto) {
    return this.deviceRecordService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceRecordService.remove(+id);
  }
}
