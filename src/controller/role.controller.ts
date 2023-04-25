import {
  Controller,
  Post,
  Get,
  Provide,
  Inject,
  Body,
  ALL,
  Query,
  Put
} from '@midwayjs/decorator';
import {RoleService} from '../service/role.service';
import {Context} from '@midwayjs/koa';
import {RoleSaveDTO, RoleSearchDTO} from '../interface/role';
import {ApiOperation} from '@midwayjs/swagger';

@Provide()
@Controller('/role')
export class RoleController {
  @Inject()
  RoleService: RoleService;

  @Inject()
  ctx: Context;

  @Post('/')
  async saveRole(@Body(ALL) role: RoleSaveDTO) {
    return await this.RoleService.saveRole(role);
  }

  @Get('/list')
  async getRoleList() {
    return await this.RoleService.getRoleList();
  }


  @Get('/page')
  @ApiOperation({
    summary: '获取角色分页',
    description: '获取角色分页',
  })
  async getRolePage(@Query() body: RoleSearchDTO) {
    return await this.RoleService.getRolePage(body);
  }

  @Put('/')
  @ApiOperation({
    summary: '更新角色',
    description: '更新角色',
  })
  async updateRole(@Body() role: any) {
    return await this.RoleService.updateRole(role);
  }

  @Put('/permission')
  @ApiOperation({
    summary: '更新角色权限',
    description: '更新角色权限',
  })
  async updateRolePermission(@Body() role: any) {
    return await this.RoleService.updateRolePermission(role);
  }


  @Get('/')
  @ApiOperation({
    summary: '获取单个角色',
    description: '获取单个角色',
  })
  async getRoleInfo(@Query('id') id: string) {
    return await this.RoleService.getRoleInfo(id);
  }
}
