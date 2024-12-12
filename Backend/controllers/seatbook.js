const Seats= require('../models/Seats');
require('dotenv').config();

exports.getSeatData= async (req, resp) => {
    try{
        let result= await Seats.find();
        result.sort((a, b) => a.seatNumber - b.seatNumber);
        resp.status(200).json(
            {
                succes: true,
                data: result,
                message: 'All the seats data fetched successfully'
            }
        )
    }
    catch(err){
        console.error(err);
        console.log(err);
        resp.status(500).json(
            {
                succes: false,
                data: "Internal Server Error",
                message: err.message
            }
        )
    }
}


exports.bookSeat= async (req, resp) => {
    try {
        const { numSeats } = req.body;

        // Validate input
        if (!numSeats || numSeats < 1 || numSeats > 7) {
            return resp.status(400).json({ message: "Invalid number of seats. You can book between 1 and 7 seats." });
        }

        // Fetch available seats
        const availableSeats = await Seats.find({ status: "available" }).sort("seatNumber");

        // Check if enough seats are available
        if (availableSeats.length < numSeats) {
            return resp.status(400).json({ message: "Not enough seats available." });
        }

        // Try to book seats in a single row first
        let bookedSeats = [];
        for (let i = 0; i < availableSeats.length; i++) {
            const currentRow = availableSeats[i].row;
            const rowSeats = availableSeats.filter(seat => seat.row === currentRow);

            if (rowSeats.length >= numSeats) {
                bookedSeats = rowSeats.slice(0, numSeats);
                break;
            }
        }

        // If no full row is found, book the nearest available seats
        if (bookedSeats.length === 0) {
            bookedSeats = availableSeats.slice(0, numSeats);
        }

        // Update the database to mark seats as booked
        const seatIds = bookedSeats.map(seat => seat._id);
        await Seats.updateMany({ _id: { $in: seatIds } }, { status: "booked" });

        resp.json({
            message: "Seats booked successfully!",
            bookedSeats: bookedSeats.map(seat => seat.seatNumber),
        });
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: "An error occurred while booking seats." });
    }
}
