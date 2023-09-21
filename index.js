const express = require('express');
const app = express();
const User = require('./models/user')

app.get('/secret', (req, res) => {
    res.send("Super secret mojodojo")
})

app.listen(3000, () => {
    console.log("Server is running");
})