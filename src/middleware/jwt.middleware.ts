import { Inject, Middleware } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { httpError } from '@midwayjs/core';

@Middleware()
export class JwtPassportMiddleware {
  @Inject()
  jwtService: JwtService;

  // 你要忽略的路径
  ignore(ctx: Context): boolean {
    return (
      ctx.path === '/user/login' ||
      ctx.path === '/captcha' ||
      ctx.path === '/user' ||
      (ctx.header.type !== 'backstage' && ctx.method === 'GET') //
    );
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 判断下有没有校验信息
      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError('请先登录');
      }
      // 从 header 上获取校验信息
      const parts = ctx.get('authorization').trim().split(' ');
      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError();
      }
      const [scheme, token] = parts;
      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          await this.jwtService.verify(token, {
            complete: true,
          });
        } catch (error) {
          //token过期 生成新的token
          // const newToken = getToken(user);
          //将新token放入Authorization中返回给前端
          // ctx.set('Authorization', newToken);
        }
        await next();
      }
    };
  }
}
