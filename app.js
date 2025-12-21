const express = require("express");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const router = require("./routes/index");
const app = express();

app.use(expressLayouts);
app.set("layout", "./layouts/main.ejs");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressLayouts);

app.use(
  session({
    secret: "Kucing Terbang Neil Amstrong",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: true },
  })
);

app.use(router);

const port = 3000;
app.listen(port, () => console.log(`Listening on http://127.0.0.1:${port}`));
