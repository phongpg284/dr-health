import { PartialType } from '@nestjs/mapped-types';
import { CreateBloodTestDto } from './create-blood-test.dto';

export class UpdateBloodTestDto extends PartialType(CreateBloodTestDto) {}
