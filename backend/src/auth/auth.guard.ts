import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { AuthRequest } from './interfaces/auth-request.interface'
import { AccessTokenPayload } from './interfaces/access-token-payload.interface'
import { UserService } from 'src/user/user.service'
import { UserNotFoundException } from 'src/user/exceptions/user-not-found.exception'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass()
        ])

        if (isPublic) {
            return true
        }

        const request = context.switchToHttp().getRequest<AuthRequest>()
        const token = this.extractToken(request)

        if (token == null) {
            throw new UnauthorizedException()
        }

        try {
            const payload =
                await this.jwtService.verifyAsync<AccessTokenPayload>(token)
            const user = await this.userService.findOneOrNull(payload)

            if (user == null) {
                throw new UserNotFoundException()
            }

            request.user = user
        } catch {
            throw new UnauthorizedException()
        }

        return true
    }

    extractToken(request: Request): string | undefined {
        const [type, token] = request.headers['authorization']?.split(' ') ?? []

        return type === 'Bearer' ? token : undefined
    }
}
