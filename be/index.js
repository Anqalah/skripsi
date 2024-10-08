import express from "express";
import cors from "cors";
import session from "express-session";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({ db: db });
// (async () => {
//   await db.sync();
// })();

// store.sync();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    secure: "auto",
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server Sedang Berjalan...");
});
