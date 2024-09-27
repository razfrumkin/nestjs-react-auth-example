import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from '@nestjs/common'
import { catchError } from 'rxjs'
import { UserNotFoundError } from './errors/user-not-found.error'
import { UserNotFoundException } from './exceptions/user-not-found.exception'

@Injectable()
export class UserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            catchError(error => {
                if (error instanceof UserNotFoundError) {
                    throw new UserNotFoundException()
                }

                throw error
            })
        )
    }
}
