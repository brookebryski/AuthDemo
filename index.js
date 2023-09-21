const express = require('express');
const app = express();
const User = require('./models/user')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://127.0.0.1:27017/authDemo', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Mongo Connection open!")
})
.catch(err => {
    console.log("there was a Mongo connection error:")
    console.log(err)
})

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.send('Welcome Home');
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User ({
        username,
        password: hash
    })
    await user.save();
    res.redirect('/');
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        res.send("Successfully logged in");
    } else {
        res.send("Could not log you in");
    }
})

app.get('/secret', (req, res) => {
    res.send("Super secret mojodojo")
})

app.listen(3000, () => {
    console.log("Server is running");
})