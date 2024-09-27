export class UsernameAlreadyExistsError extends Error {
    constructor(username: string) {
        super(`Username "${username}" already exists`)

        Object.setPrototypeOf(this, UsernameAlreadyExistsError.prototype)
    }
}
