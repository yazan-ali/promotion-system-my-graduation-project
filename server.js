const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const promotionRequestRoutes = require('./routes/promotionRequest');
const userRoutes = require('./routes/user');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:3000",
        // origin: "https://wise-promotion-system.herokuapp.com",
        credentials: true,
    })
);

// error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something went wrong');
})

// mongoose connection
mongoose.connect(process.env.DB);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// routes
app.use(promotionRequestRoutes);
app.use(userRoutes);


// serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});