import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { CaptchaService } from '@midwayjs/captcha';
import { User } from '../entry/user';
// import { Role } from '../entry/role';
import { Repository } from 'typeorm';
import { UserLoginDTO, UserSearchDTO } from '../interface/user';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { CustomHttpError } from '../error/custom.error'

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
    const { username = '', pageNo = 1, pageSize = 10,phone='' ,email=''} = queryUser;

    const total = await this.UserModel.count();
    const list = await this.UserModel.createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .leftJoinAndMapMany('role.menus', 'role.menus', 'menu')
      .where(`user.username LIKE '%${username}%'`, { username })
      .andWhere(`user.phone LIKE '%${phone}%'`, { phone })
      .andWhere(`user.email LIKE '%${email}%'`, { email })
      .orderBy({
        'user.createdAt': 'DESC',
      })
      .skip((Number(pageNo) - 1) * Number(pageSize))
      .take(Number(pageSize))
      .getMany();
    return { list, total, pageNo, pageSize };
  }

  async userLogin(user: UserLoginDTO) {
    const { username,id, answer  } = user;
    const passed: boolean = await this.captchaService.check(id, answer);
    if (!passed) {
      throw new CustomHttpError('验证码不正确',1006);
    }
    const User = await this.UserModel.createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .leftJoinAndMapMany('role.menus', 'role.menus', 'menu')
      .where(`user.username LIKE '%${username}%'`, { username: username })
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
      { expiresIn: '1h' }
    );
    return {
      ...User,
      token: `Bearer ${token}`,
    };
  }
}
