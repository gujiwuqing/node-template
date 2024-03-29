import {
  ALL,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Provide,
  Query,
} from '@midwayjs/decorator';
import { RoleService } from '../service/role.service';
import { Context } from '@midwayjs/koa';
import { RoleSaveDTO, RoleSearchDTO } from '../interface/role';
import { ApiOperation, ApiTags } from '@midwayjs/swagger';
import { Validate } from '@midwayjs/validate';

@Provide()
@ApiTags(['角色'])
@Controller('/role')
export class RoleController {
  @Inject()
  RoleService: RoleService;

  @Inject()
  ctx: Context;

  @Validate({
    locale: 'zh_CN',
  })
  @Post('/')
  @ApiOperation({
    summary: '创建角色',
  })
  async saveRole(@Body(ALL) role: RoleSaveDTO) {
    return await this.RoleService.saveRole(role);
  }

  @Get('/list')
  @ApiOperation({
    summary: '获取角色列表',
  })
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

  @Post('/update')
  @ApiOperation({
    summary: '更新角色',
    description: '更新角色',
  })
  async updateRole(@Body() role: any) {
    return await this.RoleService.updateRole(role);
  }

  @Post('/permission')
  @ApiOperation({
    summary: '更新角色权限',
    description: '更新角色权限',
  })
  async updateRolePermission(@Body() role: any) {
    console.log('role',role);
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

  @Post('/deleteOneById')
  @ApiOperation({
    summary: '删除角色',
    description: '删除角色',
  })
  async deleteRole(@Body('id') id:string) {
    return await this.RoleService.deleteRole(id);
  }
}
