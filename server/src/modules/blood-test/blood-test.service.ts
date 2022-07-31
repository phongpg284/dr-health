import { Injectable } from '@nestjs/common';
import { CreateBloodTestDto } from './dto/create-blood-test.dto';
import { UpdateBloodTestDto } from './dto/update-blood-test.dto';

@Injectable()
export class BloodTestService {
  create(createBloodTestDto: CreateBloodTestDto) {
    return 'This action adds a new bloodTest';
  }

  findAll() {
    return `This action returns all bloodTest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bloodTest`;
  }

  update(id: number, updateBloodTestDto: UpdateBloodTestDto) {
    return `This action updates a #${id} bloodTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} bloodTest`;
  }
}
