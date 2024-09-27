export class UsernameNotFoundError extends Error {
    constructor(username: string) {
        super(`User "${username}" not found`)

        Object.setPrototypeOf(this, UsernameNotFoundError.prototype)
    }
}
