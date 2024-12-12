const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
    seatNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    row: {
        type: Number,
        required: true,
    },
    status: { 
        type: String, 
        enum: ["available", "booked"], 
        default: "available" 
    }
});

const Seat = mongoose.model("Seat", seatSchema);
module.exports = Seat;
