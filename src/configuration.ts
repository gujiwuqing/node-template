import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as orm from '@midwayjs/typeorm';
import * as jwt from '@midwayjs/jwt';
import * as swagger from '@midwayjs/swagger';
import * as captcha from '@midwayjs/captcha';
import { join } from 'path';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { InternalServerErrorFilter } from './filter/internal.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { FormatMiddleware } from './middleware/format.middleware';
import { JwtPassportMiddleware } from './middleware/jwt.middleware';

@Configuration({
  imports: [
    koa,
    validate,
    orm,
    jwt,
    swagger,
    captcha,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([
      ReportMiddleware,
      FormatMiddleware,
      JwtPassportMiddleware,
    ]);
    // add filter
    this.app.useFilter([
      NotFoundFilter,
      DefaultErrorFilter,
      InternalServerErrorFilter,
    ]);
  }
}
