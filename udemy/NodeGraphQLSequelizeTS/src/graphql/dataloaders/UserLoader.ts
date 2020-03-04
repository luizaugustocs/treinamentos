import {UserInstance, UserModel} from "../../models/UserModel";

export class UserLoader {
    static batchUsers(user: UserModel, ids: number[]): Promise<UserInstance[]> {
        return Promise.resolve(user.findAll({
            where: {id: {$in: ids}}
        }).value())
    }
}