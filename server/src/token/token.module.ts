import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { JwtRefreshStrategy } from 'src/auth/strategy/jwtRefresh.strategy';
import { JWT_SECRET_KEY } from 'src/config';
import { OrmModule } from 'src/orm/orm.module';
import { TokenService } from './token.service';

@Module({
  imports: [
    OrmModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [TokenService, JwtStrategy, JwtRefreshStrategy],
  exports: [TokenService],
})
export class TokenModule {}
