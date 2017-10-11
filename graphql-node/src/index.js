import express from 'express';
import bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {execute, subscribe} from 'graphql';
import {createServer} from 'http';
import {SubscriptionServer} from 'subscriptions-transport-ws';

import schema from './schema';

import connectMongo from './mongo-connector';
import {authenticate} from './authentication';
import buildDataLoaders from './dataloader';
import formatError from "./formatError";

const start = async () => {

    const mongo = await connectMongo();

    const buildOptions = async (req, res) => {
        const user = await authenticate(req, mongo.Users)
        return {
            context: {
                dataloaders: buildDataLoaders(mongo),
                mongo,
                user
            },
            formatError,
            schema
        }
    }

    let app = express();
    const PORT = 3000;

    app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));

    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
        passHeader: `'Authorization': 'bearer token-luiz@google.com'`,
        subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
    }));




    const server = createServer(app);

    server.listen(PORT,() => {
        SubscriptionServer.create({execute, subscribe, schema}, {server, path: '/subscriptions'});
        console.log(`GraphQL server listening on port ${PORT}`);

    })

}


start();