import express from "express";

import {
  createTrans,
  deleteTransById,
  getTransByUserId,
} from "../trans Model/TransModel.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { authorization } = req.headers;

    const result = await createTrans({ ...req.body, userId: authorization });
    result?._id
      ? res.json({
          status: "success",
          message: "New Transactions has been added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to add the transaction, Please try again later",
        });
  } catch (error) {
    next(error);
  }
});
// gettung yser specified transaction
//getting user specifi transactions  based on user id
router.get("/", async (req, res, next) => {
  try {
    //auth headers

    const result = await getTransByUserId();

    res.json({
      status: "success",
      message: "getting all the transaction ",
      result,
    });
  } catch (error) {
    next(error);
  }
});

//delete trans
router.delete("/", async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const result = await deleteTransById(req.body, authorization);

    result?.deletedCount
      ? res.json({
          status: "success",
          message: result?.deletedCount + "item(s) deleted",
        })
      : res.json({
          status: "error",
          message: "Unable to delete the transaction, please try again ",
        });
  } catch (error) {
    next(error);
  }
});
export default router;
