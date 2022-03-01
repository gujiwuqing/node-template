import { EntityModel } from '@midwayjs/orm';
import { Column } from 'typeorm';
import { BaseModel } from './index';

@EntityModel()
export class User extends BaseModel {
  @Column()
  name: string;
}
