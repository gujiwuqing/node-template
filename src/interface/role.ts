import { BaseListDTO } from './base';
import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export enum UserRole {
  ROOT = 'root',
  ADMIN = 'admin',
  VISITOR = 'visitor',
}

export class RoleSearchDTO extends BaseListDTO {
  @ApiProperty({ description: '角色名称' })
  name?: string;

  @ApiProperty({
    enum: [UserRole.ROOT, UserRole.ADMIN, UserRole.VISITOR],
    description: '角色类型',
  })
  type?: UserRole;
}

export class RoleSaveDTO {
  @ApiProperty({ description: '角色名称' })
  @Rule(RuleType.string().required())
  name: string;

  @ApiProperty({ description: '角色描述' })
  @Rule(RuleType.string().empty())
  description: string;

  @ApiProperty({
    description: '角色类型',
    enum: [UserRole.ROOT, UserRole.ADMIN, UserRole.VISITOR],
  })
  @Rule(RuleType.string().required())
  type: UserRole;

  @ApiProperty({ description: '角色菜单' })
  menus: any[];
}
