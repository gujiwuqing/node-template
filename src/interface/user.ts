import {BaseListDTO} from './base';
import {Rule, RuleType} from '@midwayjs/validate';
import {ApiProperty} from '@midwayjs/swagger';

export interface UserSearchDTO extends BaseListDTO {
  username?: string;
}

export class UserDTO {
  @Rule(RuleType.string().required())
  @ApiProperty({
    description: '用户名',
    example: 'admin',
  })
  username: string;

  @Rule(RuleType.string().required())
  @ApiProperty({
    description: '密码',
    example: '123456',
  })
  password: string;

  @Rule(RuleType.string().required())
  @ApiProperty({
    description: '邮箱',
    example: '123456@qq.com',
  })
  email: string;

  @ApiProperty({
    description: '角色',
    example: '1',
  })
  role: any;
}

export class UserLoginDTO {

  @Rule(RuleType.string().required())
  @ApiProperty({
    description: '用户名',
    example: 'admin',
  })
  username: string;

  @Rule(RuleType.string().required())
  @ApiProperty({
    description: '密码',
    example: '123456',
  })
  password: string;
}
