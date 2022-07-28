import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BloodService } from './blood.service';
import { CreateBloodDto } from './dto/create-blood.dto';
import { UpdateBloodDto } from './dto/update-blood.dto';

@Controller('blood')
export class BloodController {
  constructor(private readonly bloodService: BloodService) {}

  @Post()
  create(@Body() createBloodDto: CreateBloodDto) {
    return this.bloodService.create(createBloodDto);
  }

  @Get()
  findAll() {
    return this.bloodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bloodService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBloodDto: UpdateBloodDto) {
    return this.bloodService.update(+id, updateBloodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bloodService.remove(+id);
  }
}
