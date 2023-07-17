import {Context} from '@midwayjs/koa';
import {Menu} from '../entry/menu';
import {Inject, Provide} from '@midwayjs/decorator';
import {InjectEntityModel} from '@midwayjs/typeorm';
import {Repository} from 'typeorm';
import {MenuSearchDTO} from '../interface/menu';

@Provide()
export class MenuService {
  @InjectEntityModel(Menu)
  MenuModel: Repository<Menu>;

  @Inject()
  ctx: Context;

  async createMenu(body: any) {
    console.log(body);
    await this.MenuModel.save(body);
    return {
      code: 200,
      msg: 'success',
    };
  }

  async getMenuList() {
    const list = await this.MenuModel.find();
    return {
      code: 200,
      msg: 'success',
      data: list,
    };
  }

  async getMenuInfo(id: string) {
    return await this.MenuModel.findOne({
      where: {
        id,
      }
    });
  }

  async updateMenu(menu: any) {
    return await this.MenuModel.update(menu.id, menu);
  }

  //查询列表
  async getMenuPage(queryUser: MenuSearchDTO) {
    const {
      title = '',
      path = '',
      pageNo = 1,
      pageSize = 10,
      type = '',
      status = '',
    } = queryUser;

    const [list, total] = await this.MenuModel.createQueryBuilder('menu')
      .where(`menu.title LIKE '%${title}%'`, {title: title})
      .andWhere(`menu.type LIKE '%${type}%'`, {type})
      .andWhere(`menu.status LIKE '%${status}%'`, {status})
      .andWhere(`menu.path LIKE '%${path}%'`, {path})
      .orderBy({
        // 'menu.sort': 'DESC',
        'menu.createdAt': 'DESC',
      })
      .skip((Number(pageNo) - 1) * Number(pageSize))
      .take(Number(pageSize))
      .getManyAndCount();
    return {list, total, pageNo, pageSize};
  }

  async deleteMenu(id) {
    return this.MenuModel.delete({id});
  }
}
