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
//     origin:"https://edum-two.vercel.app",
//     credentials: true,
// }
// app.use(cors(corsOptions));

const allowedOrigins = [
  "https://edum-two.vercel.app",  // Production
  "http://localhost:4000",  // Development
];

const corsOptions = {
  origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          console.log("Blocked by CORS:", origin);
          callback(new Error("Not allowed by CORS"));
      }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"], // Ensure all necessary methods are allowed
  allowedHeaders: ["Content-Type", "Authorization"],
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
