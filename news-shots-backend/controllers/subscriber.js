const Subscriber = require('../models/subscriber')

exports.getSubscriberById = (req, res, next, id) => {
    Subscriber.findById(id).exec((err, subs) => {
        if(err){
            return res.status(400).json({
                error: "Subscriber not found in db"
            });
        }
        req.subscriber = subs;
        next();
    });
};

exports.createSubscriber = (req, res) => {
    const subscriber = new Subscriber(req.body);
    subscriber.save((err, subscriber) => {
        if(err){
            if(err.code == "11000"){
                return res.status(400).json({
                    error: 'Email already added in the database'
                });
            }
            return res.status(400).json({
                error: 'Not able to save email in the Database'
            });
        }

        res.json({subscriber});
    });
};

exports.getSubscriber = (req, res) => {
    return res.json(req.subscriber);
};

exports.getAllSubscriber = (req, res) => {
    Subscriber.find().exec((err, subscribers) => {
        if(err){
            return res.status(400).json({
                error: "No Subscriber Found"
            });
        }
        res.json(subscribers);
    });
};

exports.removeSubscriber = (req, res) => {
    const subscriber = req.subscriber;

    subscriber.remove((err, deletedSubscriber) => {
        if(err){
            return res.status(400).json({
                error: "Not able to remove Subscriber"
            });
        }
        res.json({
            message: `Subscriber ${deletedSubscriber.email} Removed from Mailing list`
        });
    });
};
