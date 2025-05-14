import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['owner', 'renter'], required: true },
    isVerified: { type: Boolean, default: false }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;
