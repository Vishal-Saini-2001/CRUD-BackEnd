const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email:String,
    password:String
})

const Data = mongoose.model('Data',schema);
module.exports = Data;