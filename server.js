import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();

const PORT = process.env.MONGO_URL || 8000;

import cors from "cors";
import morgan from "morgan";
import path from "path";
const __dirname = path.resolve();

//db connection
import { connectMongodb } from "./src/config/dbConfig.js";
connectMongodb();
//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routers
import userRouter from "./src/routers/userRouter.js";
import transRouter from "./src/routers/transRouter.js";
import { userAuth } from "./src/midllewares/authMidlleware.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/transaction", userAuth, transRouter);

// static content serve
app.use(express.static(path.join(__dirname, "/client/build")));

//serving frontend
app.use("/", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/index.html"));
  } catch (error) {
    next(error);
  }
});

//uncaugh router hanlder   page not found hanlde garna laiX
app.use("*", (req, res, next) => {
  const error = {
    gErrorCode: 404,
    message: "Requested resouces not found",
  };
  next(error);
});

//global error hanlder   page 500 server hanlde garna lai
app.use((error, req, res, next) => {
  try {
    console.log(error.message);
    const gErrorCode = error.gErrorCode || 500;

    res.status(gErrorCode).json({
      status: "error",
      message: error.message,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`your server us running at http://localhost:${PORT}`);
});
