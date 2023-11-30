import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export interface UserRequest {
  id: number;
  email: string;
  tokenID?: string;
  role: string;
  roleId?: string;
}
@Injectable()
export class AuthService {
  constructor(private userService: UserService, private tokenService: TokenService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const { user, roleId } = await this.userService.findOneByEmail(email);
    if (!user) return { message: 'User not found!' };

    const isMatchPassword = await argon2.verify(user.password, password);
    if (user && isMatchPassword) {
      const { password, ...result } = user;
      return { ...result, roleId };
    }
    return { message: 'Wrong password!' };
  }

  async refresh(user: UserRequest) {
    const isRefreshTokenValid = await this.tokenService.getRefreshToken(user);
    if (!isRefreshTokenValid)
      return {
        message: 'Expired Refresh Token',
        statusCode: 401,
      };

    // SIGN NEW ACCESS TOKEN AND REFRESH TOKEN
    const accessToken = await this.tokenService.signToken(user);
    await this.tokenService.removeRefreshToken(user);
    const refreshToken = await this.tokenService.signRefreshToken(user);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async signup(user: CreateUserDto) {
    const result = await this.userService.create(user);
    const userPayload = { id: result.id, role: result.role, email: result.email };
    const accessToken = await this.tokenService.signToken(userPayload);
    const refreshToken = await this.tokenService.signRefreshToken(userPayload);
    return { ...result, accessToken, refreshToken };
  }

  async login(user: UserRequest) {
    const accessToken = await this.tokenService.signToken(user);
    const refreshToken = await this.tokenService.signRefreshToken(user);
    return {
      id: user.id,
      role: user.role,
      email: user.email,
      roleId: user.roleId,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async logout(user: UserRequest) {
    return await this.tokenService.removeRefreshToken(user);
  }

  async logoutAll(user: UserRequest) {
    return await this.tokenService.removeRefreshTokenAll(user);
  }
}
