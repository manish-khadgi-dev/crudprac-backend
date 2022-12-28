import express from "express";

const app = express();

const PORT = process.env.PORT || 8000;
//middlewares
import cors from "cors";
import morgan from "morgan";

//db connection
import { connectMongodb } from "./src/config/dbConfig.js";
connectMongodb();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routers
import userRouter from "./src/routers/userRouter.js";
app.use("/api/v1/user", userRouter);

//uncaugh router hanlder   page not found hanlde garna lai
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
