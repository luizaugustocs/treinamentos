import * as express from 'express';
import * as expressGraphQL from 'express-graphql';
import schema from './graphql/schema';
import db from './models';
import {extractJWTMiddleware} from "./middlewares/extract-jwt.middleware";
import {Request} from "express";

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
    }

    private middleware(): void {
        this.express.use('/graphql',
            extractJWTMiddleware(),
            expressGraphQL((req: Request) => ({
                schema,
                graphiql: process.env.NODE_ENV === 'development',
                context: {...req['context'], db}
            })))
    }
}

export default new App().express;