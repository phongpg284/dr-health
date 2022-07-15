import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalThresholdService } from './medical-threshold.service';
import { CreateMedicalThresholdDto } from './dto/create-medical-threshold.dto';
import { UpdateMedicalThresholdDto } from './dto/update-medical-threshold.dto';

@Controller('medical-threshold')
export class MedicalThresholdController {
  constructor(private readonly medicalThresholdService: MedicalThresholdService) {}

  @Post()
  create(@Body() createMedicalThresholdDto: CreateMedicalThresholdDto) {
    return this.medicalThresholdService.create(createMedicalThresholdDto);
  }

  @Get()
  findAll() {
    return this.medicalThresholdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalThresholdService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalThresholdDto: UpdateMedicalThresholdDto) {
    return this.medicalThresholdService.update(+id, updateMedicalThresholdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalThresholdService.remove(+id);
  }
}
