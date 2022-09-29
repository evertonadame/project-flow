import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import TokenPayload from '../types/tokenPayload.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const validUser = user && user.password === password;
    const invalidUser = user && user.password !== password;

    if (!user) {
      throw new UnauthorizedException({
        message: 'invalid user',
        error: 404,
        statusCode: 404,
      });
    }

    if (invalidUser) {
      throw new UnauthorizedException({
        message: 'Invalid Credentials',
        error: 400,
        statusCode: 400,
      });
    }

    if (validUser) {
      const { id, name, email } = user;
      return { id, name, email };
    }
  }

  public getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `$reactflow=${token}; HttpOnly; Path=/; Max-Age=64800; 'Secure';`;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
      payload,
    };
  }
}
