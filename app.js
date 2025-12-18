const express = require('express');
const session = require('express-session');
const router = require('./routes/index');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(
    session({
        secret: 'Kucing Terbang Neil Amstrong',
        resave: false,
        saveUninitialized: false,
        cookie: {secure: false, sameSite:true }
    })
);

app.use(router);

const port = 3000;
app.listen(port, () => console.log(`Listening on http://127.0.0.1:${port}`));