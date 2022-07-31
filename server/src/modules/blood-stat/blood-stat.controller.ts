import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BloodStatService } from './blood-stat.service';
import { CreateBloodStatDto } from './dto/create-blood-stat.dto';
import { UpdateBloodStatDto } from './dto/update-blood-stat.dto';

@Controller('blood-stat')
export class BloodStatController {
  constructor(private readonly bloodStatService: BloodStatService) {}

  @Post()
  create(@Body() createBloodStatDto: CreateBloodStatDto) {
    return this.bloodStatService.create(createBloodStatDto);
  }

  @Get()
  findAll() {
    return this.bloodStatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bloodStatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBloodStatDto: UpdateBloodStatDto) {
    return this.bloodStatService.update(+id, updateBloodStatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bloodStatService.remove(+id);
  }
}
