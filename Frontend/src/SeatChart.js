import React, { useEffect, useState } from "react";
import axios from "axios";

const SeatChart = ({Toggle}) => {
    const [seats, setSeats] = useState([]);

    useEffect(() => {
        getSeats()
    }, [Toggle]);

    const getSeats= async ()=> {
        axios.get("http://localhost:5001/api/v1/getSeatData") 
            .then(response => setSeats(response.data.data))
            .catch(err => console.error(err));
    }

    return (
        <div>
            <h2>Seat Chart</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "40px" }}>
                {seats.map(seat => (
                    <div
                        key={seat.seatNumber}
                        style={{
                            width: "45px",
                            height: "45px",
                            textAlign: "center",
                            lineHeight: "50px",
                            backgroundColor: seat.status === "available" ? "green" : "red",
                            color: "white",
                            border: "1px solid black",
                        }}
                    >
                        {seat.seatNumber}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeatChart;
