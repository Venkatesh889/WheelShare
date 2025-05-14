import mongoose from 'mongoose';

const carSchema = mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    availability: [
        {
            start: { type: Date, required: true },
            end: { type: Date, required: true },
        }
    ],
    price: { type: Number, required: true },
    location: { type: String, required: true }
});

const Car = mongoose.model('Car', carSchema);

export default Car;
