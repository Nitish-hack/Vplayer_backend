const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const uploadsRoutes = require("./routes/uploads");

const app = express();
const PORT=process.env.PORT||5000;  

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/uploads", uploadsRoutes);



const server = app.listen(PORT, () =>
  console.log(`Server started on ${PORT}`)
);