const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    userName: {type: String, required: false, max: 10},
    email: {type: String, required: true, max: 20},
    password: {type: String, required: true},
    formData:{type: Object ,required:true}
});


// Export the model
module.exports = mongoose.model('users', UserSchema);