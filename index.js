require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { connectMongoDB } = require("./config/db");
const userRoute = require('./routes/user.js');
const taskRoute = require('./routes/task.js');

const PORT = process.env.PORT;
connectMongoDB();

app.use(express.json());
app.use(cors());
app.use('/api',userRoute)
app.use('/api',taskRoute)

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
