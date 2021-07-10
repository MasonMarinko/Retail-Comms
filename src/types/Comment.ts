import {User} from './User'

export interface Comment {
    id: string
    commentType: string
    employeeName: string
    message: string
    createdBy: string,
    readBy: []
    users: Partial<User>[]
}