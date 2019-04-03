import * as express from 'express';
import * as expressGraphQL from 'express-graphql';
import schema from './graphql/schema';
import db from './models';
import {extractJWTMiddleware} from "./middlewares/extract-jwt.middleware";
import {Request} from "express";
import {DataLoaderFactory} from "./graphql/dataloaders/DataLoaderFactory";
import {RequestedFields} from "./graphql/ast/RequestedFields";

class App {

    public express: express.Application;
    private dataLoaderFactory: DataLoaderFactory;
    private requestedFields: RequestedFields;

    constructor() {
        this.express = express();
        this.requestedFields = new RequestedFields();
        this.dataLoaderFactory = new DataLoaderFactory(db, this.requestedFields);
        this.middleware();
    }

    private middleware(): void {
        this.express.use('/graphql',
            extractJWTMiddleware(),
            expressGraphQL((req: Request) => ({
                schema,
                graphiql: process.env.NODE_ENV === 'development',
                context: {...req['context'], db, dataloaders: this.dataLoaderFactory.getLoaders(), requestedFields: this.requestedFields}
            })))
    }
}

export default new App().express;