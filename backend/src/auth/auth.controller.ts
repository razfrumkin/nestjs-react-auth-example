import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dto/sign-up.dto'
import { SignInDto } from './dto/sign-in.dto'
import { AuthResponse } from './interfaces/auth-response.interface'
import { Public } from './decorators/public.decorator'
import { User } from 'src/user/user.entity'
import { AuthRequest } from './interfaces/auth-request.interface'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('sign-up')
    async signUp(@Body() signUpDto: SignUpDto): Promise<AuthResponse> {
        return this.authService.signUp(signUpDto)
    }

    @Public()
    @Post('sign-in')
    async signIn(@Body() signInDto: SignInDto): Promise<AuthResponse> {
        return this.authService.signIn(signInDto)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async find(@Request() request: AuthRequest): Promise<User> {
        return this.authService.find(request)
    }
}
