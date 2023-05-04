import { Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Role } from '../entry/role';
import { Repository } from 'typeorm';
import { RoleSearchDTO } from '../interface/role';
import { Context } from '@midwayjs/koa';

@Provide()
export class RoleService {
  @InjectEntityModel(Role)
  RoleModel: Repository<Role>;

  @Inject()
  ctx: Context;

  // save
  async saveRole(user) {
    if (!user.name) {
      return { success: false, message: '标签不得为空', code: '2000' };
    }
    const Role = await this.RoleModel.findOneBy({
      name: user.name,
    });
    if (Role) {
      return { success: false, message: '标签已存在', code: '2000' };
    }
    return await this.RoleModel.save(user);
  }

  //查询列表
  async getRoleList() {
    return await this.RoleModel.find({
      relations: ['users', 'menus'],
    });
  }

  //查询分页
  async getRolePage(queryUser: RoleSearchDTO) {
    const { name = '', pageNo = 1, pageSize = 10, type = '' } = queryUser;
    console.log(type);
    const [list, total] = await this.RoleModel.createQueryBuilder('role')
      .where(`role.name LIKE '%${name}%'`, { name: name })
      .andWhere(`role.type LIKE '%${type}%'`, { type })
      .orderBy({
        'role.createdAt': 'DESC',
      })
      .skip((Number(pageNo) - 1) * Number(pageSize))
      .take(Number(pageSize))
      .getManyAndCount();
    // .getSql();

    return { list, total, pageNo, pageSize };
  }

  async updateRole(role) {
    console.log(role);
  }

  async updateRolePermission(data) {
    // {menus:[{id:'1'}]
    const { id, menus } = data;
    const roleToUpdate = await this.RoleModel.findOne(id);
    roleToUpdate.menus = menus;
    return await this.RoleModel.save(roleToUpdate);
  }

  async getRoleInfo(id) {
    return this.RoleModel.findOne({
      where: {
        id,
      },
      relations: ['users', 'menus'],
    });
  }
}
