import { EntityModel } from '@midwayjs/orm';
import { Column } from 'typeorm';
import { BaseModel } from './index';

@EntityModel()
export class User extends BaseModel {
  @Column({
    comment: '用户名',
  })
  username: string;

  @Column({
    comment: '密码',
  })
  password: string;

  @Column({
    comment: '邮箱',
  })
  email: string;
}
