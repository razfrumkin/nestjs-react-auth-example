import { Injectable } from '@nestjs/common'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { UserService } from '../user/user.service'
import { User } from '../user/user.entity'
import { AuthRequest } from './interfaces/auth-request.interface'
import { AuthResponse } from './interfaces/auth-response.interface'
import { JwtService } from '@nestjs/jwt'
import { AccessTokenPayload } from './interfaces/access-token-payload.interface'
import { WrongPasswordError } from './errors/wrong-password.error'
import { UsernameNotFoundError } from './errors/username-not-found.error'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<AuthResponse> {
        await this.userService.create(signUpDto)

        return this.signIn(signUpDto)
    }

    async signIn(signInDto: SignInDto): Promise<AuthResponse> {
        const { username, password } = signInDto

        const user = await this.userService.findOneOrNull({ username })

        if (user == null) {
            throw new UsernameNotFoundError(username)
        }

        if (user.password !== password) {
            throw new WrongPasswordError(signInDto)
        }

        const payload: AccessTokenPayload = { username }

        return { token: this.jwtService.sign(payload), user }
    }

    async find(request: AuthRequest): Promise<User> {
        return request.user
    }
}
