import { Schema, model } from 'mongoose';
import { jobSchema } from './jobTypeModel.js';
import { reviewSchema } from './reviewModel.js';

const providerSchema = new Schema({
    availability: { type: String, default: "Full time" },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photo: { type: String },
    city: { type: String, required: true },
    state: { type: String },
    street: { type: String },
    country: { type: String, required: true },
    zip: { type: String, required: true },
    qualification: [jobSchema],
    experience: { type: String, default: "0" },
    rate: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    review: { type: Number, default: 0 },
});

export const Provider = model('provider', providerSchema);