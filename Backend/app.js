const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db");

const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const paymentRoutes = require("./routes/payment.routes");


connectToDb();

const _dirname = path.resolve();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const corsOptions ={
//     origin:"http://localhost:4000",
//     credentials: true,
// }
// app.use(cors(corsOptions));

// app.use(cors());
const allowedOrigins = [
    "http://localhost:4000", // Hardcoded allowed origin
    process.env.ALLOWED_ORIGIN, // Dynamic origin from .env
  ];
  
  // CORS configuration
  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies if needed
  };
  
  app.use(cors(corsOptions));

// app.get("/", (req, res) => {
//     res.status(200).json({ message: "Welcome to the Backend API!" });
// });

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/api/payment', paymentRoutes)

app.use(express.static(path.join(_dirname, "/Frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
})


module.exports = app;
