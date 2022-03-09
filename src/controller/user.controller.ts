import { Inject, Controller, Post, Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { User } from '../interface';

@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/')
  async getUser(@Body() user: User) {
    await this.userService.saveUser({ ...user });
  }
}
