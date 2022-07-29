import { Address } from 'src/modules/address/entities/address.entity';

export class UpdateUserDto {
  fullName?: string;
  email?: string;
  password?: string;
  role?: string;
  phone?: string;
  gender?: string;
  dob?: Date;
  address: Address;
  job?: string;
  ethnic?: string;
  identity?: string;
}
