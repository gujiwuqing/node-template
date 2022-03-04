import { Catch } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';

const errCode = {
  Unauthorized: 401,
};

const errMsg = {
  Unauthorized: '请先登录',
};
@Catch()
export class DefaultErrorFilter {
  async catch(err: Error, ctx: Context) {
    // 所有的未分类错误会到这里
    return {
      success: false,
      message: errMsg[err.message] || err.message,
      code: errCode[err.message] || 500,
    };
  }
}
