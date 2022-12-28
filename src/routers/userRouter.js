import express from "express";
import { createUser } from "../userModel/UserModel.js";

const router = express.Router();

router.all("*", (req, res, next) => {
  console.log("got hit by the router");
  next();
});

// post user in db
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await createUser(req.body);
    console.log(result);
    result?._id
      ? res.json({
          status: "success",
          message: "test to post user",
        })
      : res.json({
          status: "error",
          message: "unable to creaet user",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.gErrorCode = 200;
      error.message = "already a";
    }

    next(error);
  }
});

export default router;
