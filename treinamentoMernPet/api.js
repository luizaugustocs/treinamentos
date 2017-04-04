module.exports = function(router) {
    var stormpath = require('express-stormpath');
    var mongoose = require(mongoose);

    mongoose.Promise = global.Promise;

    var db = mongoose.connection;

    db.on('error', console.error);

    db.once('open', function(){

        var Schema = mongoose.Schema;
        var issueSchema = new Schema({
            owner: string,
            description: string,
            createdAt: {
                type: Date, default: Date.now
            },
            status: {
                type: Number, min: 0, max: 2, default: 0
            },
            priority: {
                type: Number, min: 0, max: 2, default: 0
            },
            comments:[{
                user: String, message: String, default:[]
            }]
        })

        var Issue = mongoose.model('Issue',issueSchema)
    });

    mongoose.connect('mongodb://localhost:27017/test')

	
}
