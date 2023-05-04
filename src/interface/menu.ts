import { BaseListDTO } from './base';
import { ApiProperty } from '@midwayjs/swagger';

export class MenuSearchDTO extends BaseListDTO {
  @ApiProperty({ description: '菜单名称' })
  title?: string;

  @ApiProperty({ description: '菜单类型' })
  type?: string;

  @ApiProperty({ description: '菜单状态' })
  status?: string;
}

export class MenuDTO {
  @ApiProperty({ description: '菜单名称' })
  title: string;

  @ApiProperty({ description: '菜单图标' })
  icon: string;

  @ApiProperty({ description: '路由地址' })
  path: string;

  @ApiProperty({ description: '菜单编码' })
  code: string;

  @ApiProperty({ description: '菜单类型' })
  type: string;

  @ApiProperty({ description: '菜单状态' })
  status: string;

  @ApiProperty({ description: '菜单父级id' })
  parentId: string;

  @ApiProperty({ description: '菜单排序' })
  sort: number;
}
