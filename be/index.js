import express from "express";
import cors from "cors";
import session from "express-session";
import db from "./config/Database.js";
import dotenv from "dotenv";
import userRoute from "./routes/UserRoute.js";
import productRoute from "./routes/ProductRoute.js";
dotenv.config();

const app = express();

// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    secure: "auto",
  })
);

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json());
app.use(userRoute);
app.use(productRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server Sedang Berjalan...");
});
