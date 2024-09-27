import { IsString, Matches } from '@nestjs/class-validator'
import { Trim } from '../../common/decorators/trim.decorator'

export class SignInDto {
    @IsString()
    @Trim()
    @Matches(/^[a-zA-Z0-9_]{4,16}$/, {
        message:
            'Username must be 4 to 16 characters long and can only contain letters, digits, and underscores.'
    })
    username: string

    @IsString()
    @Trim()
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]).{8,}$/,
        {
            message:
                'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.'
        }
    )
    password: string
}
