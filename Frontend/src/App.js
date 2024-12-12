import React, { useState } from "react";
import SeatChart from "./SeatChart";
import SeatBooking from "./SeatBooking";

const App = () => {
  const [Toggle, setToggle] = useState(true)
    return (
        <div>
            <h1>Train Booking System</h1>
            <SeatBooking Toggle={Toggle} setToggle={setToggle}/>
            <SeatChart Toggle={Toggle}/>
        </div>
    );
};

export default App;
