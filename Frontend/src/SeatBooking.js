import React, { useState } from "react";
import {getSeats} from "./SeatChart";    

const SeatBooking = ({Toggle, setToggle}) => {
    const [numSeats, setNumSeats] = useState(1);

    const handleBooking = async () => {
        let result= await fetch('http://localhost:5001/api/v1/book', {
            method: 'post',
            body: JSON.stringify({ numSeats }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        result= await result.json();
        console.warn(result);  
        setToggle(!Toggle);
    };

    return (
        <div>
            <h2>Book Seats</h2>
            <label>
                Number of Seats (1-7):
                <input
                    type="number"
                    value={numSeats}
                    min="1"
                    max="7"
                    onChange={(e) => setNumSeats(Number(e.target.value))}
                />
            </label>
            <button onClick={handleBooking}>Book</button>
        </div>
    );
};

export default SeatBooking;
