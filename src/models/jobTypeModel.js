import { Schema, model } from 'mongoose';

export const jobSchema = new Schema({
    name: { type: String, default: 'Plumber' }
})

export default model('jobType', jobSchema);