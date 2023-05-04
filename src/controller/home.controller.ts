import { Controller, Get, Inject } from '@midwayjs/core';
import { CaptchaService } from '@midwayjs/captcha';
import { ApiOperation } from '@midwayjs/swagger';
@Controller('/')
export class HomeController {
  @Inject()
  captchaService: CaptchaService;

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }

  // 示例：获取图像验证码
  @ApiOperation({ summary: '获取验证码' })
  @Get('/captcha')
  async getImageCaptcha() {
    const { id, imageBase64 } = await this.captchaService.image({
      width: 120,
      height: 40,
    });
    return {
      id, // 验证码 id
      imageBase64, // 验证码 SVG 图片的 base64 数据，可以直接放入前端的 img 标签内
    };
  }
}
