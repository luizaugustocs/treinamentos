import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import {DBConnection} from "../interfaces/DBConnectionInterface";
import configs from '../config/config';

const BASE_NAME: string = path.basename(module.filename);

const ENV: string = process.env.NODE_ENV || 'development';

const config = configs[ENV];

const db = {};
if (Object.keys(db).length === 0) {

    const operatorsAliases = {
        $in: Sequelize.Op.in
    };

    const sequelize: Sequelize.Sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        {...config, operatorsAliases}
        );

    fs.readdirSync(__dirname)
        .filter((filename: string) =>
            (filename.indexOf('.') !== 0)
            && (filename !== BASE_NAME)
            && (filename.slice(-3) === '.js'))
        .forEach((filename: string) => {
            const model = sequelize.import(path.join(__dirname, filename));
            db[model['name']] = model;
        })
    
    Object.keys(db)
        .filter((modelName) => !!db[modelName].associate)
        .forEach((modelName) => db[modelName].associate(db));

    db['sequelize'] = sequelize;
}
export default <DBConnection>db;