import express from 'express';
import bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';

import schema from './schema';

import connectMongo from './mongo-connector';
import {authenticate} from './authentication';

const start = async () => {

    const mongo = await connectMongo();

    const buildOptions = async (req, res) => {
        const user = await authenticate(req, mongo.Users);
        console.log(user);
        return {
            context: {mongo, user},
            schema
        }
    }  

    let app = express();
    
    app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));    
    
    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
        passHeader: `'Authorization': 'bearer token-luiz@google.com'`
    }));
    
    
    const PORT = 3000;
    
    app.listen(PORT, () => {
        console.log(`GraphQL server listening on port ${PORT}`);
    });

}


start();