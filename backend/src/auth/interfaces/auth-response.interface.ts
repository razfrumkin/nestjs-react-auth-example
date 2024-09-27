import { User } from 'src/user/user.entity'

export interface AuthResponse {
    token: string
    user: User
}
