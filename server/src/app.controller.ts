import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import JwtRefreshGuard from './auth/guard/jwtRefresh-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtRefreshGuard)
  @Get('auth/refresh')
  refresh(@Request() req) {
    return this.authService.refresh(req.user);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('auth/logout')
  logout(@Request() req) {
    return this.authService.logout(req.user);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('auth/logout_all')
  logoutAll(@Request() req) {
    return this.authService.logoutAll(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
