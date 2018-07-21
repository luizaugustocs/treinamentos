import {Sequelize} from "sequelize";
import {ModelsInteface} from "./ModelsInteface";

export interface DBConnection extends ModelsInteface {

    sequelize: Sequelize
}