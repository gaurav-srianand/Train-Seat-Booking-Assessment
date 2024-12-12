const mongoose = require('mongoose');
require('dotenv').config();
const Seats= require('../models/Seats')

const initializeSeats = async () => {
    const seatCount = await Seats.countDocuments();
    if (seatCount === 0) {
        const seats = [];
        let seatNumber = 1;
        for (let row = 1; row <= 12; row++) {
            const seatsInRow = row === 12 ? 3 : 7;
            for (let i = 0; i < seatsInRow; i++) {
                seats.push({
                    seatNumber,
                    row,
                    status: "available",
                });
                seatNumber++;
            }
        }
        await Seats.insertMany(seats);
        console.log("80 seats initialized in the database.");
    } else {
        console.log("Seats already initialized in the database.");
    }
};

exports.connect = () => {
  mongoose
    .connect(process.env.DATABSE_URL, {})
    .then( async() => {
        console.log('Db connected Successfully')
        await initializeSeats();
    })
    .catch((error) => {
      console.log('Issue in Db connection');
      console.error(error.message);
      process.exit(1);
    });
};
