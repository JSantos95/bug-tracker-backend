const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
    companyname: {
        type: String, 
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
}, {
    timestamps: true,
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;