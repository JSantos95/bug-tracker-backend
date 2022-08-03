import mongoose from 'mongoose';
import { Company as CompanySchema } from '../interface';

const Schema = mongoose.Schema;

const companySchema = new Schema<CompanySchema>({
    companyName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    ownerId: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;