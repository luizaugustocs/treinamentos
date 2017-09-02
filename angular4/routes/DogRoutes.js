import mongoose from 'mongoose';
import express from 'express';
import Dog from '../model/DogModel';
const router = express.Router();


router.get('/', (req, res) => {
    Dog.find().then((dogs, err) => {
        if (err) {
            return res.status(500).send({
                message: `Error while fetching dogs: ${err}`
            })
        }
        return res.json({
            values: dogs
        })
    })
});

router.get('/new', (req, res) => {
    res.send({

    })
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Id invalid'
        });
    }

    Dog.findById(id).then((dog, err) => {
        if (err) {
            return next(err);
        } else if (!dog) {
            return res.status(404).send();
        }
        return res.json({
            value: dog
        })
    })
});

router.post('/', (req, res, next) => {
    Dog.create(req.body).then((dog, err) => {
        if (err) {
            return next(err);
        }
        return res.json(dog);
    })
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    Dog.findByIdAndUpdate(id, req.body, { new: true }).then((dog, err) => {
        if (err) {
            return next(err);
        }
        return res.json(dog);
    })

});
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Dog.findByIdAndRemove(id).then((dog, err) => {
        if (err) {
            return next(err);
        }
        return res.json(dog);
    })

});

export default router;