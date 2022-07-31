import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BloodTestStatService } from './blood-test-stat.service';
import { CreateBloodTestStatDto } from './dto/create-blood-test-stat.dto';
import { UpdateBloodTestStatDto } from './dto/update-blood-test-stat.dto';

@Controller('blood-test-stat')
export class BloodTestStatController {
  constructor(private readonly bloodTestStatService: BloodTestStatService) {}

  @Post()
  create(@Body() createBloodTestStatDto: CreateBloodTestStatDto) {
    return this.bloodTestStatService.create(createBloodTestStatDto);
  }

  @Get()
  findAll() {
    return this.bloodTestStatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bloodTestStatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBloodTestStatDto: UpdateBloodTestStatDto) {
    return this.bloodTestStatService.update(+id, updateBloodTestStatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bloodTestStatService.remove(+id);
  }
}
