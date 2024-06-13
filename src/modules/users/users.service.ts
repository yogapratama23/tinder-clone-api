import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { SignupInput } from './dto/signup-input.dto';
import { decrypt, encrypt } from 'src/commons/helpers/crypto.helper';
import { ConfigService } from '@nestjs/config';
import { LoginInput } from './dto/login-input.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dto/login-response.dto';
import { FindUserInput } from './dto/find-user-input.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  async signUp(input: SignupInput): Promise<void> {
    try {
      const checkUser = await this.userRepository
        .createQueryBuilder('user')
        .where('user.username = :username', { username: input.username })
        .getCount();
      if (checkUser > 0) {
        throw new UnprocessableEntityException('username already exist');
      }

      const hashPassword = encrypt(
        input.password,
        this.configService.get<string>('SECRET'),
      );

      const user = this.userRepository.create({
        username: input.username,
        password: hashPassword,
      });

      await this.userRepository.save(user);
    } catch (e) {
      throw e;
    }
  }

  async login(input: LoginInput): Promise<LoginResponse> {
    try {
      const checkUser = await this.userRepository
        .createQueryBuilder('user')
        .where('user.username = :username', { username: input.username })
        .addSelect('user.password')
        .getOne();
      if (!checkUser) {
        throw new UnprocessableEntityException('invalid credential(s)');
      }

      const stringPassword = Buffer.from(input.password, 'base64').toString(
        'ascii',
      );
      const plainPassword = decrypt(
        checkUser.password,
        this.configService.get<string>('SECRET'),
      );
      if (stringPassword !== plainPassword) {
        throw new UnprocessableEntityException('invalid credential(s)');
      }

      const token = await this.jwtService.signAsync({
        username: checkUser.username,
        membership: checkUser.membership,
      });

      return { accessToken: token };
    } catch (e) {
      throw e;
    }
  }

  async findUser(input: FindUserInput): Promise<UsersEntity> {
    try {
      const { id, username } = input;
      const sql = this.userRepository.createQueryBuilder('user');
      if (input.id) {
        sql.andWhere('user.id = :id', { id });
      }
      if (input.username) {
        sql.andWhere('user.username = :username', { username });
      }

      return sql.getOne();
    } catch (e) {
      throw e;
    }
  }
}
