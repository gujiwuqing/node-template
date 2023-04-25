import { Catch } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';

@Catch()
export class DefaultErrorFilter {
  async catch(err: Error, ctx: Context) {
    // 所有的未分类错误会到这里
    return {
      // @ts-ignore
      status: err.status ?? 500,
      success: false,
      message: err.message
    }
  }
}
