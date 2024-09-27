import { User } from '../../user/user.entity'

export interface AuthRequest extends Request {
    user: User
}
