import { Column, OneToMany, ManyToMany, Entity } from 'typeorm';
import { BaseModel } from '../model/base';
import { User } from './user';
import { Menu } from './menu';

@Entity()
export class Role extends BaseModel {
  @Column({
    comment: '名称',
  })
  name: string;

  @Column({
    comment: '类型',
  })
  type: string;
  // visitor 访客  admin 管理员 root 超级管理员

  @Column({
    comment: '描述',
    default: '',
  })
  description: string;

  @OneToMany(() => User, user => user.role, {
    cascade: true,
  })
  users: User[];

  @ManyToMany(() => Menu, menu => menu.role)
  menus: Menu[];
}
