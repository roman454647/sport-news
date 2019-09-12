const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path');

require('dotenv').config();

const app = express();
const dbConnect = require('./db/connect');

dbConnect.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


app.use(passport.initialize());

//require('./config/passport')(passport)
require('./config/passport');
// TODO: change that part ,please:)
app.get('/hello', (req, res) => {
  res.send('Hello');
});

const PORT = process.env.PORT || 5000;

// TODO: change console.log()
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

const cors = require('cors');


app.use(cors());
// Route Files

const register = require('./routes/register');
const login = require('./routes/login');
const forgotPassword = require('./routes/forgotPassword');
const logout = require('./routes/logout');
const updateProfile = require('./routes/updateProfile');
const resetPassword = require('./routes/resetPassword');

const subscription = require('./routes/subscription');

app.use('/register', register);
app.use('/login', login);
app.use('/forgotpassword', forgotPassword);
app.use('/logout', logout);
app.use('/updateprofile', updateProfile);
app.use('/resetpassword', resetPassword);
app.use('/subscription', subscription);


const article = require('./routes/article');
const video = require('./routes/video');


app.use('/register', register);
app.use('/login', login);
app.use('/forgotpassword', forgotPassword);
app.use('/logout', logout);
app.use('/updateprofile', updateProfile);
app.use('/resetpassword', resetPassword);
app.use('/article', article);
app.use('/video', video);


app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
