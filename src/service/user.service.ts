import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { User } from '../entry/user';
import { Repository } from 'typeorm';
import { Context } from '@midwayjs/koa';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  @Inject()
  ctx: Context;

  // save
  async saveUser(data) {
    const { username } = data;
    const user = await this.userModel.findOne({ username });
    if (user) {
      return (this.ctx.body = this.ctx.error('标签不得为空', 402));
    }
    const userData = await this.userModel.save({ ...data });
    this.ctx.body = this.ctx.success(userData, '用户创建成功');
    return userData;
  }
}
