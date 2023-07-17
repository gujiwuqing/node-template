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
import { ApiOperation, ApiTags } from '@midwayjs/swagger';
import { Validate } from "@midwayjs/validate";

@ApiTags(['菜单'])
@Controller('/menu')
export class MenuController {
  @Inject()
  ctx: Context;

  @Inject()
  MenuService: MenuService;

  @Validate({
    locale: 'zh_CN',
  })
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

  @Get('/')
  @ApiOperation({
    summary: '获取单个菜单信息',
    description: '获取单个菜单信息',
  })
  async getRoleInfo(@Query('id') id: string) {
    return await this.MenuService.getMenuInfo(id);
  }

  @Post('/update')
  @ApiOperation({
    summary: '更新菜单',
    description: '更新菜单',
  })
  async updateMenu(@Body(ALL) menu: MenuDTO) {
    return await this.MenuService.updateMenu(menu);
  }

  @Post('/deleteOneById')
  @ApiOperation({
    summary: '删除菜单',
    description: '删除菜单',
  })
  async deleteMenu(@Body('id') id:string) {
    return await this.MenuService.deleteMenu(id);
  }
}
