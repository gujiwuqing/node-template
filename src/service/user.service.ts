import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entry/user';
// import { Role } from '../entry/role';
import { Repository } from 'typeorm';
import { UserLoginDTO, UserSearchDTO } from '../interface/user';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { httpError } from '@midwayjs/core';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  UserModel: Repository<User>;

  @Inject()
  jwt: JwtService;

  @Inject()
  ctx: Context;

  // save
  async saveUser(user) {
    if (!user.username || !user.password) {
      throw new httpError.InternalServerErrorError('用户名不得为空');
    }
    const User = await this.UserModel.findOne(user.username);
    if (User) {
      throw new httpError.InternalServerErrorError('用户已存在');
    }
    return await this.UserModel.save(user);
  }

  //查询列表
  async getUserList(queryUser: UserSearchDTO) {
    const { username = '', pageNo = 1, pageSize = 10 } = queryUser;

    const total = await this.UserModel.count();
    const list = await this.UserModel.createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .leftJoinAndMapMany('role.menus', 'role.menus', 'menu')
      .where(`user.username LIKE '%${username}%'`, { username: username })
      .orderBy({
        'user.createdAt': 'DESC',
      })
      .skip((Number(pageNo) - 1) * Number(pageSize))
      .take(Number(pageSize))
      .getMany();
    return { list, total, pageNo, pageSize };
  }

  async userLogin(user: UserLoginDTO) {
    const { username } = user;
    // const User = await this.UserModel.findOne({ username: user.username });
    const User = await this.UserModel.createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .leftJoinAndMapMany('role.menus', 'role.menus', 'menu')
      .where(`user.username LIKE '%${username}%'`, { username: username })
      .orderBy({
        'user.createdAt': 'DESC',
      })
      .getOne();
    if (!User) {
      return {
        success: false,
        message: '用户不存在',
        code: '12200',
      };
    }
    if (User.password !== user.password) {
      return {
        success: false,
        message: '密码不正确',
        code: '12200',
      };
    }
    const token = await this.jwt.sign(
      {
        data: 'foobar',
      },
      // secret,
      { expiresIn: '1h' }
    );
    return {
      ...User,
      token: `Bearer ${token}`,
    };
  }
}
