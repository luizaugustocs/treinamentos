import * as http from 'http';
import app from './app';
import db from './models';

const server = http.createServer(app);
const port = process.env.port || 3000;

db.sequelize.sync()
    .then(() => {
        server.listen(port);
    });


server.on('listening', () => {
    console.log(`Listening on port ${port}.`)
});

