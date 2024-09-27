import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from '@nestjs/common'
import { catchError } from 'rxjs'
import { WrongPasswordError } from './errors/wrong-password.error'
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception'
import { UsernameAlreadyExistsError } from '../user/errors/username-already-exists.error'
import { UsernameAlreadyExistsException } from '../user/exceptions/username-already-exists.exception'
import { UsernameNotFoundError } from './errors/username-not-found.error'

@Injectable()
export class AuthInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            catchError(error => {
                if (error instanceof UsernameAlreadyExistsError) {
                    throw new UsernameAlreadyExistsException()
                }

                if (
                    error instanceof UsernameNotFoundError ||
                    error instanceof WrongPasswordError
                ) {
                    throw new InvalidCredentialsException()
                }

                throw error
            })
        )
    }
}
