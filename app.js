const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();

const dotenv = require('dotenv');

const cookieParser = require('cookie-parser');

dotenv.config({path:'./.env'});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');
// app.set('view engine', 'html');
// app.engine('html', require('hbs').__express);

db.connect((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log('MySql Connected....');
    }
});

//Define Routes
app.use('/', require('./routes/pages'));

app.use('/auth', require('./routes/auth'));

app.listen(5000, () =>{
    console.log("Server is started on port 5000")
});