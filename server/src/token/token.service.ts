import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRequest } from 'src/auth/auth.service';
import {
  EXPIRE_JWT_SECRET_KEY,
  EXPIRE_REFRESH_JWT_SECRET_KEY,
  JWT_SECRET_KEY,
  REFRESH_JWT_SECRET_KEY,
} from 'src/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService, @InjectRedis() private redis: Redis) {}

  async getRefreshToken(user: UserRequest) {
    const key = user.id.toString() + ':' + user.tokenID;
    const refreshToken = await this.redis.get(key);
    if (!refreshToken) return null;
    return refreshToken;
  }

  async signToken(user: UserRequest) {
    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
      roleId: user.roleId,
      expireAt: Date.now() + EXPIRE_JWT_SECRET_KEY,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: JWT_SECRET_KEY,
      expiresIn: EXPIRE_JWT_SECRET_KEY + 's',
    });
    return accessToken;
  }

  async signRefreshToken(user: UserRequest) {
    const tokenID = uuidv4();
    const payload = {
      expireAt: Date.now() + EXPIRE_REFRESH_JWT_SECRET_KEY,
      tokenID: tokenID,
      email: user.email,
      id: user.id,
      role: user.role,
      roleId: user.roleId,
    };
    const refreshToken = this.jwtService.sign(payload, {
      secret: REFRESH_JWT_SECRET_KEY,
      expiresIn: EXPIRE_REFRESH_JWT_SECRET_KEY + 's',
    });

    // SET REDIS REFRESH TOKEN
    const key = user.id.toString() + ':' + tokenID;
    await this.redis.set(key, refreshToken, 'EX', EXPIRE_REFRESH_JWT_SECRET_KEY);

    return refreshToken;
  }

  async removeRefreshToken(user: UserRequest) {
    const key = user.id.toString() + ':' + user.tokenID;
    try {
      // CLEAR REDIS TOKEN
      await this.redis.del(key);
    } catch (error) {
      Logger.error(error);
      return error;
    }
    return 'Successfully clear token!';
  }

  async removeRefreshTokenAll(user: UserRequest) {
    const key = user.id.toString() + ':*';
    try {
      // CLEAR ALL REDIS TOKEN
      await this.redis.del(key);
    } catch (error) {
      Logger.error(error);
      return error;
    }
    return 'Successfully clear token!';
  }
}
