import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { GetMedicalStatQuery } from 'src/modules/medical-stat/dto/get-medical-stat.dto';
import { MedicalThresholdService } from 'src/modules/medical-threshold/medical-threshold.service';

@Controller('patient')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly medicalThresholdService: MedicalThresholdService,
  ) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  async findAll() {
    return this.patientService.findAll();
  }

  @Get('medical_stats/:id')
  getMedicalStats(@Param('id') id: string, @Body() query?: GetMedicalStatQuery) {
    return this.patientService.getStats(+id, query);
  }

  @Get('medical_threshold/:id')
  getMedicalThreshold(@Param('id') id: string) {
    return this.medicalThresholdService.getThresholdForPatient(+id);
  }

  @Get('device_records/:id')
  getDeviceRecords(@Param('id') id: string) {
    return this.patientService.getDeviceRecords(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}
