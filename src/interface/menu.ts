import { BaseListDTO } from './base';
import { ApiProperty } from '@midwayjs/swagger';

//菜单类型
export enum MenuType {
  MENU = 'menu',
  BUTTON = 'button',
}

export class MenuSearchDTO extends BaseListDTO {
  @ApiProperty({ description: '菜单名称' })
  title?: string;

  @ApiProperty({ description: '路由地址' })
  path?: string;

  @ApiProperty({ description: '菜单类型', example: MenuType.MENU })
  type?: MenuType.MENU;

  @ApiProperty({ description: '菜单状态', example: 1 })
  status?: number;
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

  @ApiProperty({ description: '菜单类型', example: MenuType.MENU })
  type?: MenuType.MENU;

  @ApiProperty({ description: '菜单状态', example: 1 })
  status: number;

  @ApiProperty({ description: '菜单父级id' })
  parentId: string;

  @ApiProperty({ description: '菜单排序' })
  sort: number;
}
