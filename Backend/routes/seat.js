const express= require('express')
const router= express.Router();

const {getSeatData, bookSeat} = require('../controllers/seatbook');

//define api routes
router.get("/getSeatData", getSeatData);
router.post("/book", bookSeat);

module.exports= router;