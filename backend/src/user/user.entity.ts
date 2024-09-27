import { Exclude } from 'class-transformer'

export class User {
    nickname: string
    username: string

    @Exclude()
    password: string

    constructor(user: User) {
        Object.assign(this, user)
    }
}
