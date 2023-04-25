import {
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  Entity,
} from 'typeorm';
import { BaseModel } from '../model/base';
import { Role } from './role';

@Entity('menu')
export class Menu extends BaseModel {
  @Column()
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
    default: 'menu',
  })
  type: string;

  //menu:菜单 button:按钮

  @Column({
    comment: '菜单状态',
    default: '1',
  })
  status: string;

  //1:正常，0:禁用

  @ManyToOne(type => Menu, menu => menu.childMenus)
  parentMenu: Menu;

  @OneToMany(type => Menu, menu => menu.parentMenu)
  childMenus: Menu[];

  @ManyToMany(() => Role, role => role.menus)
  @JoinTable()
  role: Role;
}
