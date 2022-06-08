import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { REFRESH_JWT_SECRET_KEY } from 'src/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: REFRESH_JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    console.log(payload);
    return {
      id: payload.id,
      email: payload.email,
      tokenID: payload.tokenID,
    };
  }
}
