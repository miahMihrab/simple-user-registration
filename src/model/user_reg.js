const mongoose = require('mongoose');
const validator = require('validator');

const User_reg = mongoose.model('registration', {
    name: {
        type: String,
        required: true,
        validate(value) {
            if (value.length < 5) {
                throw new Error('Minimum length required for name is 5')
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Please enter valid email address");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (value.length < 6) {
                throw new Error('Password must be of minimum length 6');
            }
        }
    }
})

module.exports = User_reg;