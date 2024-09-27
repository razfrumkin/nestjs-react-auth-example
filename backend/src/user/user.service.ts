import { Injectable } from '@nestjs/common'
import { User } from './user.entity'
import { FindUserDto } from './dto/find-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UsernameAlreadyExistsError } from './errors/username-already-exists.error'
import { UserNotFoundError } from './errors/user-not-found.error'

@Injectable()
export class UserService {
    private readonly users: User[] = []

    async find(): Promise<User[]> {
        return this.users
    }

    async findOneOrNull(findUserDto: FindUserDto): Promise<User | undefined> {
        const { username } = findUserDto

        return this.users.find(
            user => user.username.toLowerCase() === username.toLowerCase()
        )
    }

    async findOne(findUserDto: FindUserDto): Promise<User> {
        const user = await this.findOneOrNull(findUserDto)

        if (user == null) {
            throw new UserNotFoundError(findUserDto)
        }

        return user
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { nickname, username, password } = createUserDto

        const existingUser = await this.findOneOrNull({ username })

        if (existingUser != null) {
            throw new UsernameAlreadyExistsError(username)
        }

        // this is super important because it also assigns dto properties for class serializations
        const user = new User({ nickname, username, password })
        this.users.push(user)

        return createUserDto
    }
}
