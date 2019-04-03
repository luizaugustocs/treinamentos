import {PostInstance, PostModel} from "../../models/PostModel";

export class PostLoader {
    static batchUsers(post: PostModel, ids: number[]): Promise<PostInstance[]> {
        return Promise.resolve(post.findAll({
            where: {id: {$in: ids}}
        }).value())
    }
}