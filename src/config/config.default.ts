import { MidwayConfig } from '@midwayjs/core';
import { Menu } from '../entry/menu';
import { User } from '../entry/user';
import { Role } from '../entry/role';
export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1682414696100_7305',
  koa: {
    port: 3002,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'demo',
        password: 'fengweihui1998!',
        database: 'demo',
        synchronize: true, // 如果第一次使用，不存在表，有同步的需求可以写 true
        logging: false,
        dateStrings: true, //时间转字符串
        entities: [Menu, User, Role],
      },
    },
  },
} as MidwayConfig;
