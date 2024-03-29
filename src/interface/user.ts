import { BaseListDTO } from './base';
import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';

export class UserSearchDTO extends BaseListDTO {
  @ApiProperty({
    description: '用户名',
  })
  username?: string;

  @ApiProperty({
    description: '手机号',
  })
  phone?: string;

  @ApiProperty({
    description: '邮箱',
  })
  email?: string;
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

  @Rule(
    RuleType.string().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)
  )
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

  @Rule(RuleType.string().pattern(/^1[3456789]\d{9}$/))
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

  @Rule(RuleType.optional())
  @ApiProperty({
    description: '验证码id',
  })
  id:any;

  @Rule(RuleType.string().required())
  @ApiProperty({
    description: '验证码答案',
  })
  answer: string;
}
