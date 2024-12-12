const express= require('express');
const app= express();
const cors= require('cors');

require('dotenv').config();
const PORT= process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

require('./config/database').connect();

// route import and mount
const seat= require('./routes/seat')
app.use("/api/v1", seat);

// activation
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})