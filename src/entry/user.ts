import { Column, ManyToOne, Entity } from 'typeorm';
import { BaseModel } from '../model/base';
import { Role } from './role';

@Entity()
export class User extends BaseModel {
  @Column({
    comment: '用户名',
    type: 'varchar',
  })
  username: string;

  @Column({
    comment: '密码',
  })
  password: string;

  @Column({
    comment: '邮箱',
    default: '',
  })
  email: string;

  @Column({
    comment: '手机号',
    default: '',
  })
  phone: string;

  //默认启用 1启用 2禁用
  @Column({
    comment: '状态',
    default: 1,
  })
  status: number;

  @ManyToOne(() => Role, role => role.users)
  role: Role;
}
