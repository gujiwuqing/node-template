import {
  Inject,
  Controller,
  Post,
  Body,
  ALL,
  Get,
  Query,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { MenuService } from '../service/menu.service';
import { MenuDTO, MenuSearchDTO } from '../interface/menu';
import { ApiOperation } from '@midwayjs/swagger';

@Controller('/menu')
export class MenuController {
  @Inject()
  ctx: Context;

  @Inject()
  MenuService: MenuService;

  @Get('/list')
  @ApiOperation({
    summary: '获取菜单列表',
    description: '获取菜单列表',
  })
  async getMenuList() {
    return await this.MenuService.getMenuList();
  }

  @Get('/page')
  @ApiOperation({
    summary: '获取菜单分页',
    description: '获取菜单分页',
  })
  async getMenuPage(@Query() body: MenuSearchDTO) {
    return await this.MenuService.getMenuPage(body);
  }

  @Post('/')
  @ApiOperation({
    summary: '创建菜单',
    description: '创建菜单',
  })
  async createMenu(@Body(ALL) body: MenuDTO) {
    return await this.MenuService.createMenu({
      ...body,
    });
  }
}
