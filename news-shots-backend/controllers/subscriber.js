const Subscriber = require('../models/subscriber')
const fetch = require('cross-fetch');

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

exports.sendConfirmMail = (req, res) => {
    var email = req.body.email;

    fetch(`${process.env.BACKEND_API}/verify`, {
        method: "POST",
        body: JSON.stringify({email}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));

    res.json('Email Sent for verification');
}

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

        res.json('Subscribed to NewsShots');
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
