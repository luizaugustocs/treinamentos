import express from 'express'; // server middleware
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const router = express.Router();

import config from './config';

import DogRoutes from './routes/DogRoutes';
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URL, {useMongoClient: true}).then(
  () => { console.info('Mongoose Connected')},
  (err) => { console.error(`Unable to connect to mongo: ${err}`)}
);

var app = express();

// Use SSL connection provided by Bluemix. No setup required besides redirecting all HTTP requests to HTTPS

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


// Home
app.get('/', function (req, res) {
  res.send('Woof Woof!');
  
});

app.use('/dog',DogRoutes);

app.listen(config.PORT, function () {
  console.log("Node server running on " + config.PORT);
});