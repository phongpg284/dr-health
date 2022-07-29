import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalStatService } from './medical-stat.service';
import { CreateMedicalStatDto } from './dto/create-medical-stat.dto';
import { UpdateMedicalStatDto } from './dto/update-medical-stat.dto';

@Controller('medical-stat')
export class MedicalStatController {
  constructor(private readonly medicalStatService: MedicalStatService) {}

  @Post()
  create(@Body() createMedicalStatDto: CreateMedicalStatDto) {
    return this.medicalStatService.create(createMedicalStatDto);
  }

  @Get()
  findAll() {
    return this.medicalStatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalStatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalStatDto: UpdateMedicalStatDto) {
    return this.medicalStatService.update(+id, updateMedicalStatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalStatService.remove(+id);
  }
}
