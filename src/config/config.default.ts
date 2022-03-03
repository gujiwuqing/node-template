import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1646105953707_4674',
  jwt: {
    secret: 'sasd121saaadl1213121', // fs.readFileSync('xxxxx.key')
    expiresIn: '2d',
  },
  koa: {
    port: 7001,
  },
  orm: {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'admin123456',
    database: 'test',
    synchronize: true, // 如果第一次使用，不存在表，有同步的需求可以写 true
    logging: false,
    dateStrings: true, //时间转字符串
  },
} as MidwayConfig;
