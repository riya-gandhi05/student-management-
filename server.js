const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());


require("./user")(app);
require("./subject")(app);
require("./marks")(app);
require("./attendance")(app);
require("./enrollment")(app);


mongoose.connect(process.env.DBURL)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch(err => console.log(err));


const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log("Server running on port " + PORT);
});