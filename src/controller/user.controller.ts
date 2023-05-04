import {
  Controller,
  Post,
  Get,
  Provide,
  Inject,
  Body,
  ALL,
  Query,
} from '@midwayjs/decorator';
import { UserService } from '../service/user.service';
import { Context } from '@midwayjs/koa';
import { UserSearchDTO, UserLoginDTO, UserDTO } from '../interface/user';
import { ApiOperation, ApiTags } from '@midwayjs/swagger';

@Provide()
@ApiTags(['用户'])
@Controller('/user')
export class UserController {
  @Inject()
  UserService: UserService;

  @Inject()
  ctx: Context;

  @ApiOperation({ summary: '新增用户' })
  @Post('/')
  async saveUser(@Body(ALL) user: UserDTO) {
    return await this.UserService.saveUser(user);
  }

  @ApiOperation({ summary: '获取用户列表' })
  @Get('/page')
  async getUserList(@Query(ALL) queryUser: UserSearchDTO) {
    return await this.UserService.getUserList(queryUser);
  }

  @ApiOperation({ summary: '用户登录' })
  @Post('/login')
  async userLogin(@Body(ALL) user: UserLoginDTO) {
    return await this.UserService.userLogin(user);
  }
}
