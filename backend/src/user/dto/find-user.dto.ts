import { IsString } from '@nestjs/class-validator'
import { Trim } from 'src/common/decorators/trim.decorator'

export class FindUserDto {
    @IsString()
    @Trim()
    username: string
}
