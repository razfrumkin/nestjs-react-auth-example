import { FindUserDto } from '../dto/find-user.dto'

export class UserNotFoundError extends Error {
    constructor(findUserDto: FindUserDto) {
        super(`User not found for: ${findUserDto}`)

        Object.setPrototypeOf(this, UserNotFoundError.prototype)
    }
}
