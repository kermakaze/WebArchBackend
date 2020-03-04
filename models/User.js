const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    fullName:{type: String, required: false},
    email:{type:String, required: false},
    phoneNumber: {type: String, required: true, unique: true, sparse: true},
    password:{type: String, required: true},

    maritalStatus: {type:String, required: false, enum: ['Married','Single', 'Divorced']},
    employmentStatus: {type: String,enum: ['Student','Employed', 'Pensioneer'], required: false},
    ethnicGroup: {type:String, required: true, default: -1},
    digitalAddress:{type:String, required: true, default: -1},
    address: {type:String, required: false},
    nationalId:{type:String, required: false},

    gender: {type:String, enum: ['Male', 'Female'], required:false}



}, {collection: "users", timestamps: true});

UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });


const User = mongoose.model('User', UserSchema);

module.exports = User;
