import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { NotificationService } from 'src/modules/notification/notification.service';
import { ScheduleService } from 'src/modules/schedule/schedule.service';
import { Public } from 'src/utils/public.decorator';

// @UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
    private readonly scheduleService: ScheduleService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('/role/:id')
  getRoleData(@Param('id') id: string) {
    return this.userService.getRoleData(+id);
  }

  @Get('/notifications/:id')
  getAllNotifications(@Param('id') id: string) {
    return this.notificationService.findAllByUser(+id);
  }

  @Get('/schedules/:id')
  getAllSchedules(@Param('id') id: string) {
    return this.scheduleService.findAllByUser(+id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
