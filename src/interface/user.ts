import { BaseListDTO } from './base';
import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';

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

  @Rule(RuleType.optional())
  @ApiProperty({
    description: '角色',
    example: '1',
  })
  role: any;

  @Rule(RuleType.string().optional())
  @ApiProperty({
    description: '手机号',
    example: '13052635241',
  })
  phone: string;

  @Rule(RuleType.number().optional())
  @ApiProperty({
    description: '状态',
    example: 1,
  })
  status: number;
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
