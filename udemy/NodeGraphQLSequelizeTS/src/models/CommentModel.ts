import * as Sequelize from "sequelize";
import {BaseModelInterface} from "../interfaces/BaseModelInterface";
import {ModelsInteface} from "../interfaces/ModelsInteface";

export interface CommentAttributes {

    id?: number;
    comment?: string;
    post?: number;
    user?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface CommentInstance extends Sequelize.Instance<CommentAttributes> {
}

export interface CommentModel extends BaseModelInterface, Sequelize.Model<CommentInstance, CommentAttributes> {

}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): CommentModel => {
    const Comment: CommentModel = sequelize.define<CommentInstance, CommentAttributes>('Comment', {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
            type: dataTypes.TEXT,
            allowNull: false
        },

    }, {
        tableName: 'comment',
    });

    Comment.associate = (models: ModelsInteface): void => {
        Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false,
                field: 'post',
                name: 'fk_comment_post'
            }
        });
        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'user',
                name: 'fk_comment_user'
            }
        });
    };

    return Comment;


}