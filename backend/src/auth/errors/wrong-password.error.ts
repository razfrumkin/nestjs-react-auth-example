import { SignInDto } from '../../auth/dto/sign-in.dto'

export class WrongPasswordError extends Error {
    constructor(signInDto: SignInDto) {
        const { username, password } = signInDto

        super(
            `User "${username}"'s password does not match with the password "${password}"`
        )

        Object.setPrototypeOf(this, WrongPasswordError.prototype)
    }
}
