import { Injectable } from '@nestjs/common';
import { CreateSupersonicTestDto } from './dto/create-supersonic-test.dto';
import { UpdateSupersonicTestDto } from './dto/update-supersonic-test.dto';

@Injectable()
export class SupersonicTestService {
  create(createSupersonicTestDto: CreateSupersonicTestDto) {
    return 'This action adds a new supersonicTest';
  }

  findAll() {
    return `This action returns all supersonicTest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supersonicTest`;
  }

  update(id: number, updateSupersonicTestDto: UpdateSupersonicTestDto) {
    return `This action updates a #${id} supersonicTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} supersonicTest`;
  }
}
