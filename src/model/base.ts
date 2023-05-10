import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as dayjs from 'dayjs';

const dateTransformer = {
  from: (value: Date | number) => {
    console.log('value', value);
    return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
  },
  to: () => new Date(),
};

export class BaseModel {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    transformer: dateTransformer,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    transformer: dateTransformer,
  })
  updatedAt: Date;
}
