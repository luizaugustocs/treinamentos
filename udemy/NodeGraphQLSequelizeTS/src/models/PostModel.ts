import * as Sequelize from "sequelize";
import {BaseModelInterface} from "../interfaces/BaseModelInterface";
import {ModelsInteface} from "../interfaces/ModelsInteface";

export interface PostAttributes {

    id?: number;
    title?: string;
    content?: string;
    photo?: string;
    author?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface PostInstance extends Sequelize.Instance<PostAttributes> {
}

export interface PostModel extends BaseModelInterface, Sequelize.Model<PostInstance, PostAttributes> {

}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): PostModel => {
    const Post: PostModel = sequelize.define<PostInstance, PostAttributes>('Post', {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false
        },
        content: {
            type: dataTypes.TEXT,
            allowNull: false,
        },
        photo: {
            type: dataTypes.BLOB({
                length: 'long'
            }),
            allowNull: false,
        },

    }, {
        tableName: 'post',
    });

    Post.associate = (models: ModelsInteface): void => {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'author',
                name: 'fk_author'
            }
        })
    };

    return Post;


}