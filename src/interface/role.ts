import {BaseListDTO} from './base';
import {ApiProperty} from '@midwayjs/swagger';

export interface RoleSearchDTO extends BaseListDTO {
  name?: string;
  type?: string;
}


export class RoleSaveDTO {
  @ApiProperty({description: '角色名称'})
  name: string;

  @ApiProperty({description: '角色描述'})
  description: string;

  @ApiProperty({description: '角色描述'})
  type: string;

  @ApiProperty({description: '角色菜单'})
  menus: string[];
}
