import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupersonicTestService } from './supersonic-test.service';
import { CreateSupersonicTestDto } from './dto/create-supersonic-test.dto';
import { UpdateSupersonicTestDto } from './dto/update-supersonic-test.dto';

@Controller('supersonic-test')
export class SupersonicTestController {
  constructor(private readonly supersonicTestService: SupersonicTestService) {}

  @Post()
  create(@Body() createSupersonicTestDto: CreateSupersonicTestDto) {
    return this.supersonicTestService.create(createSupersonicTestDto);
  }

  @Get()
  findAll() {
    return this.supersonicTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supersonicTestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupersonicTestDto: UpdateSupersonicTestDto) {
    return this.supersonicTestService.update(+id, updateSupersonicTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supersonicTestService.remove(+id);
  }
}
