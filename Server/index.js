const express = require("express")
const {connection} = require("./Config/db")
require("dotenv").config();
const cors = require("cors");

const app = express()

app.use(express.json())
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Homepage")
})


app.listen(process.env.port, async ()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log("Unable to connect to DB");
    console.log(error);
    }
    console.log(`Listening at port ${process.env.port}`);
} )