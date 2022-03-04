import { Post, Inject, Controller } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';

@Controller('/')
export class JwtController {
  @Inject()
  jwt: JwtService;

  @Inject()
  ctx: Context;

  @Post('/passport/jwt', { middleware: [JwtPassportMiddleware] })
  async jwtPassport() {
    console.log('jwt user: ', this.ctx.req);
    return this.ctx.req;
  }

  /**
   * 生成token
   * @returns
   */
  @Post('/jwt')
  async genJwt() {
    return {
      t: await this.jwt.sign({ msg: 'Hello Midway' }),
    };
  }
}
