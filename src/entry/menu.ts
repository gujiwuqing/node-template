import {
  Column,
  ManyToMany,
  JoinTable,
  Entity,
} from 'typeorm';
import { BaseModel } from '../model/base';
import { Role } from './role';
import { MenuType } from '../interface/menu';

@Entity('menu')
export class Menu extends BaseModel {
  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    default: '',
  })
  icon: string;

  @Column({
    default: 0,
    comment: '排序',
  })
  sort: number;

  @Column({
    default: 0,
    comment: '路由地址',
  })
  path: string;

  @Column({
    comment: '菜单编码',
  })
  code: string;

  @Column({
    comment: '菜单层级',
    default: '1',
  })
  level: string;

  @Column({
    comment: '菜单类型',
    default: MenuType.MENU,
  })
  type: MenuType;

  //menu:菜单 button:按钮

  @Column({
    comment: '菜单状态',
    default: 1,
  })
  status: number;

  //1:正常，0:禁用
  @Column({
    comment: '父级菜单id',
    default: '',
  })
  parentMenuId: string;

  @ManyToMany(() => Role, role => role.menus)
  @JoinTable()
  role: Role;
}
