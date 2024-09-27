import { Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.entity'
import { FindUserDto } from './dto/find-user.dto'
import { UserInterceptor } from './user.interceptor'

@UseInterceptors(UserInterceptor)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async find(): Promise<User[]> {
        return this.userService.find()
    }

    @Get(':username')
    async findOne(@Param() findUserDto: FindUserDto): Promise<User> {
        return this.userService.findOne(findUserDto)
    }
}
