var mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');


var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    email:{
        type: String,
        maxlength: 32,
        trim: true,
        required: true,
        unique: true
    },
    encry_password:{
        type: String,
        required: true
    },
    salt: String,
},{timestamps: true});



// virutals
userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.getSecuredPassword(password);
    })
    .get(function(){
        return this._password;
    })


// converting plain to secured password
userSchema.methods = {

    authenticate: function(plainPassword){
        return this.getSecuredPassword(plainPassword) === this.encry_password;
    },

    // convert into encrypted password
    getSecuredPassword: function(plainPassword){
        if (!plainPassword)
            return "";
        try{
            const hash = crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex');

            return hash;
        }
        catch(err){
            return "";
        }
    }
}


// var doc = new mongoose.model("User", userSchema)
// Exporting this SChema outside of this file
module.exports = mongoose.model("User", userSchema)
