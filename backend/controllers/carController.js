import Car from '../models/Car.js';

export const addCar = async (req, res) => {
    try {
        const { model, year, availability, pricing, location } = req.body;
        const newCar = new Car({
            model,
            year,
            availability,
            pricing,
            location,
            ownerId: req.user.id // Use ID from JWT token
        });

        await newCar.save();
        res.status(201).json(newCar);
    } catch (error) {
        res.status(500).json({ message: 'Error adding car' });
    }
};
