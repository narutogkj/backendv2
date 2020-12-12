require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');

const sltRouter = require('./api/slt/slt.router.js')
const userRoute = require('./api/users/users.router');

app.use(cors())


app.use(express.json({ limit: '50mb' }));

const port = process.env.PORT || 4000;


app.use('/api/users', userRoute)
app.use('/api/slt', sltRouter)

app.listen(port, () => {
    console.log(`Server up and running on Port: ${port}`)
})