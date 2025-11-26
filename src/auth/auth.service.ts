import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user === null || !await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<HttpStatus> {
    const user = await this.usersService.findOne(createUserDto.username);
    if (user === null) {
      const saltOrRounds = await bcrypt.genSalt();
      const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
      await this.usersService.create(createUserDto.username, hash);
      return HttpStatus.CREATED;
    }
    throw new HttpException('User already exists', HttpStatus.UNAUTHORIZED);
  }
}
