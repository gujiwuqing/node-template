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
import { Validate } from "@midwayjs/validate";

@Provide()
@ApiTags(['用户'])
@Controller('/user')
export class UserController {
  @Inject()
  UserService: UserService;

  @Inject()
  ctx: Context;
  @Validate({
    locale: 'zh_CN',
  })
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


@Post('/update')
@ApiOperation({
  summary: '更新用户',
  description: '更新用户',
})
async updateUser(@Body() user: any) {
  return await this.UserService.updateUser(user);
}


@Get('/')
@ApiOperation({
  summary: '获取单个用户',
  description: '获取单个用户',
})
async getUserInfo(@Query('id') id: string) {
  return await this.UserService.getUserInfo(id);
}

@Post('/deleteOneById')
@ApiOperation({
  summary: '删除用户',
  description: '删除用户',
})
async deleteUser(@Body('id') id:string) {
  return await this.UserService.deleteUser(id);
}
}
