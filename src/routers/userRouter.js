import express from "express";
import { createUser, getSingleUser } from "../userModel/UserModel.js";

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
          message: "New User Created Successfully",
        })
      : res.json({
          status: "error",
          message: "unable to creaet user",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.gErrorCode = 200;
      error.message = "already exist";
    }

    next(error);
  }
});

//login user
router.post("/login", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await getSingleUser(req.body);
    console.log(result);
    result?._id
      ? res.json({
          status: "success",
          message: "Loged In",
          result,
        })
      : res.json({
          status: "error",
          message: "Invalid login",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
