import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/koa';

@Middleware()
export class LoggerMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 控制器前执行的逻辑
      const startTime = Date.now();
      // 执行下一个 Web 中间件，最后执行到控制器
      // 这里可以拿到下一个中间件或者控制器的返回值
      await next();
      // 控制器之后执行的逻辑
      const cost = Date.now() - startTime;

      console.log(`<--  [${ctx.method}] ${ctx.url} ${cost}ms  -->`);
    };
  }

  static getName(): string {
    return 'logger';
  }
}
