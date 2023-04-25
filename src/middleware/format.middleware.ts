import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next();
      if (result.code) {
        return result;
      }
      return {
        code: 200,
        message: 'success',
        data: result,
      };
    };
  }

  // match(ctx) {
  //   return ctx.path.indexOf('/api') !== -1;
  // }
}
