import { PartialType } from '@nestjs/mapped-types';
import { CreateSupersonicTestDto } from './create-supersonic-test.dto';

export class UpdateSupersonicTestDto extends PartialType(CreateSupersonicTestDto) {}
