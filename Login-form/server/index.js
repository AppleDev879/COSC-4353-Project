require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const passport = require("passport");
require("./passport")
const cookieSession = require("cookie-session");

// database connection
connection();

// middlewares
app.use(cookieSession({ name: "session", keys:[`${process.env.COOKIE_KEY}`], maxAge: 24 * 60 * 60 * 1000}));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
