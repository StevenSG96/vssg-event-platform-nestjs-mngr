import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserDTO } from 'src/domain/dtos/user/user.dto';
import { UserEntity } from 'src/domain/entities/user/user.entity';
import { ISignUp } from 'src/domain/ports/user/in/signUp';

@Controller('signup')
export class SignUpController {
  constructor(@Inject('ISignUp') private readonly signUpService: ISignUp) {}

  @Post()
  register(@Body() user: UserDTO): Promise<void> {
    const userEntity = new UserEntity(user);
    return this.signUpService.signUpUser(userEntity);
  }
}
