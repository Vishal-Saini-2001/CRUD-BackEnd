const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json())

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })

const PORT = process.env.PORT;
const URI = process.env.URI;

const mongoose = require('mongoose');
const Data = require('./model');

mongoose.connect(URI)
    .then(console.log("MongoDB Connected"))
    .catch(err => console.log(err))

// http://localhost:8080/register

app.post('/register', async (req, res) => {
    const data = req.body.data;
    const isAvailable = await Data.findOne({ email: data.email });
    if (isAvailable) {
        res.status(400).json({ msg: "Email already exists" });
    } else {
        const entry = new Data(data);
        await entry.save();
        res.status(200).json({ msg: "Registered successfully" });
    }
})

// http://localhost:8080/login

app.post('/login', async (req, res) => {
    const data = req.body.data;
    const isAvailable = await Data.findOne({ email: data.email });
    if (isAvailable) {
        if (isAvailable.password === data.password)
            res.status(200).json({ msg: "Login successfull" });
        else
        res.status(400).json({msg:"Password incorrect"});
    } else {
        res.status(400).json({msg:"Email incorrect"});
    }
})

// http://localhost:8080/update

app.post("/update",async(req,res)=>{
    const data = req.body.data;
    const isAvailable = await Data.findOne({ email: data.email });
    if (!isAvailable) {
        res.status(400).json({ msg: "Email does not exists" });
    } else {
        await Data.findOneAndUpdate({email:data.email},data)
        res.status(200).json({ msg: "Password reset successfully" });
    }
})

app.listen(PORT, () => {
    console.log("Server is live on:", PORT);
})