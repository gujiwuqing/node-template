import { Inject, Controller, Post, Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { User } from '../interface';

@Controller('/user')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/')
  async getUser(@Body() user: User) {
    const data = await this.userService.saveUser({ ...user });
    return { success: true, message: 'OK', data };
  }
}
