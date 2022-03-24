const express = require("express");
const auth = require("./routes/auth")


const app = express();

app.use(express.json());

app.use("/auth", auth);

app.get("/", (req, res) => {
    res.send("Hi I am working")
})

app.listen(3001, () => {
    console.log("Now running on port 3001!")
})