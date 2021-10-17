var mongoose = require('mongoose');

var subscriberSchema = new mongoose.Schema({
    email:{
        type: String,
        maxlength: 32,
        trim: true,
        required: true,
        unique: true
    },
},{timestamps: true});

module.exports = mongoose.model("Subscriber", subscriberSchema)
