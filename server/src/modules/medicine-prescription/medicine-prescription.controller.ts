import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicinePrescriptionService } from './medicine-prescription.service';
import { CreateMedicinePrescriptionDto } from './dto/create-medicine-prescription.dto';
import { UpdateMedicinePrescriptionDto } from './dto/update-medicine-prescription.dto';

@Controller('medicine-prescription')
export class MedicinePrescriptionController {
  constructor(private readonly medicinePrescriptionService: MedicinePrescriptionService) {}

  @Post()
  create(@Body() createMedicinePrescriptionDto: CreateMedicinePrescriptionDto) {
    return this.medicinePrescriptionService.create(createMedicinePrescriptionDto);
  }

  @Get()
  findAll() {
    return this.medicinePrescriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicinePrescriptionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicinePrescriptionDto: UpdateMedicinePrescriptionDto,
  ) {
    return this.medicinePrescriptionService.update(+id, updateMedicinePrescriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicinePrescriptionService.remove(+id);
  }
}
