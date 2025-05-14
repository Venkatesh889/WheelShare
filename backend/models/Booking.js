import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    renterId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    carId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Car' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;