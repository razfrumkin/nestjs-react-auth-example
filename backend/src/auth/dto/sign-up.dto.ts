import { IsString, Length } from '@nestjs/class-validator'
import { SignInDto } from './sign-in.dto'
import { Trim } from '../../common/decorators/trim.decorator'

export class SignUpDto extends SignInDto {
    @IsString()
    @Trim()
    @Length(1, 24, {
        message: 'Nickname must be between 1 and 24 characters long.'
    })
    nickname: string
}
