import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BloodTestService } from './blood-test.service';
import { CreateBloodTestDto } from './dto/create-blood-test.dto';
import { UpdateBloodTestDto } from './dto/update-blood-test.dto';

@Controller('blood-test')
export class BloodTestController {
  constructor(private readonly bloodTestService: BloodTestService) {}

  @Post()
  create(@Body() createBloodTestDto: CreateBloodTestDto) {
    return this.bloodTestService.create(createBloodTestDto);
  }

  @Get()
  findAll() {
    return this.bloodTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bloodTestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBloodTestDto: UpdateBloodTestDto) {
    return this.bloodTestService.update(+id, updateBloodTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bloodTestService.remove(+id);
  }
}
