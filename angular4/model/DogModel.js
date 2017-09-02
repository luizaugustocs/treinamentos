import mongoose from 'mongoose';

const DogSchema = new mongoose.Schema({
         name: {type: String, required: true},
         breed: {type: String},
         age: {type: Number, min: 0},
         size: {type: String, enum: ['TINY','SMALL', 'MEDIUM', 'BIG', 'ENORMOUS']},
         castrated: {type: Boolean, default: false}
})



export default mongoose.model('Dog', DogSchema);