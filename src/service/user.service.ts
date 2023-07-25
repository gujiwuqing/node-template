import {Inject, Provide} from '@midwayjs/decorator';
import {InjectEntityModel} from '@midwayjs/typeorm';
import {CaptchaService} from '@midwayjs/captcha';
import {User} from '../entry/user';
import {Repository} from 'typeorm';
import {UserLoginDTO, UserSearchDTO} from '../interface/user';
import {Context} from '@midwayjs/koa';
import {JwtService} from '@midwayjs/jwt';
import {CustomHttpError} from '../error/custom.error'

@Provide()
export class UserService {
  @InjectEntityModel(User)
  UserModel: Repository<User>;

  @Inject()
  jwt: JwtService;

  @Inject()
  captchaService: CaptchaService;

  @Inject()
  ctx: Context;

  // save
  async saveUser(user) {
    if (!user.username || !user.password) {
      throw new CustomHttpError('用户名不得为空', 1002);
    }
    const User = await this.UserModel.findOne({
      where: {
        username: user.username,
      },
    });
    if (User) {
      throw new CustomHttpError('用户已存在', 1003);
    }
    return await this.UserModel.save(user);
  }

  //查询列表
  async getUserList(queryUser: UserSearchDTO) {
    const {username = '', pageNo = 1, pageSize = 10, phone = '', email = ''} = queryUser;

    const query = await this.UserModel.createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .leftJoinAndMapMany('role.menus', 'role.menus', 'menu')
      .where(`user.username LIKE '%${username}%'`, {username})
      .andWhere(`user.phone LIKE '%${phone}%'`, {phone})
      .andWhere(`user.email LIKE '%${email}%'`, {email})
      .orderBy({
        'user.createdAt': 'DESC',
      })

    const [list, length] = await query.skip((Number(pageNo) - 1) * Number(pageSize))
      .take(Number(pageSize))
      .getManyAndCount();

    return {list, total: length, pageNo, pageSize};
  }

  async userLogin(user: UserLoginDTO) {
    const {username, id, answer} = user;
    const passed: boolean = await this.captchaService.check(id, answer);
    if (!passed) {
      throw new CustomHttpError('验证码不正确', 1006);
    }
    const User = await this.UserModel.createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .leftJoinAndMapMany('role.menus', 'role.menus', 'menu')
      .where(`user.username LIKE '%${username}%'`, {username: username})
      .addSelect('user.password')
      .orderBy({
        'user.createdAt': 'DESC',
      })
      .getOne();
    if (!User) {
      throw new CustomHttpError('用户不存在', 1004);
    }
    if (User.password !== user.password) {
      throw new CustomHttpError('密码不正确', 1005);
    }
    const token = await this.jwt.sign(
      {
        data: 'foobar',
      },
      // secret,
      {expiresIn: '1d'}
    );
    return {
      ...User,
      token: `Bearer ${token}`,
    };
  }


  async updateUser(user) {
    return await this.UserModel.update(user.id, user)
  }


  async getUserInfo(id) {
    return this.UserModel.findOne({
      where: {
        id,
      }
    });
  }

  async deleteUser(id) {
    return this.UserModel.delete({id});
  }
}
