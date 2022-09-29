import { Controller, Post, UseGuards, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: any,
    @Response({ passthrough: true }) response: any,
  ) {
    const accessTokenCookie = this.authService.getCookieWithJwtToken(
      req.user.id,
    );
    await response.cookie('userToken', accessTokenCookie);
    await response.cookie('id', req.user.id);
    return this.authService.login(req.user);
  }
}
