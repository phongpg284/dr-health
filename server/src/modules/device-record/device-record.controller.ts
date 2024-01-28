import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeviceRecordService } from './device-record.service';

@Controller('device-record')
export class DeviceRecordController {
  constructor(private readonly deviceRecordService: DeviceRecordService) {}

  @Post()
  create(@Body() createMedicalRecordDto) {
    // return this.deviceRecordService.create(createMedicalRecordDto);
  }

  @Get()
  findAll() {
    // return this.deviceRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.deviceRecordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalRecordDto) {
    // return this.deviceRecordService.update(+id, updateMedicalRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceRecordService.remove(+id);
  }
}
