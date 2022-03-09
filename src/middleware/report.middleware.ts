import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/koa';

@Middleware()
export class ReportMiddleware implements IMiddleware<Context, NextFunction> {
  success = (res, successMessage = '') => {
    return {
      code: 200,
      message: successMessage,
      data: res,
    };
  };

  error = (errorMessage = '', errorCode = 500) => {
    return {
      code: errorCode,
      message: errorMessage,
      data: {},
    };
  };

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      ctx.success = this.success;
      ctx.error = this.error;

      try {
        // 控制器前执行的逻辑

        // 执行下一个 Web 中间件，最后执行到控制器

        // 这里可以拿到下一个中间件或者控制器的返回值
        // 控制器之后执行的逻辑
        // 返回给上一个中间件的结果
        return await next();
      } catch (e) {
        console.log(e);
      }
    };
  }

  static getName(): string {
    return 'report';
  }
}
