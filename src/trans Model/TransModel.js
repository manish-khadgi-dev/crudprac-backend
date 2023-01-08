import TransSchema from "./TransSchema.js";

// create Trans
export const createTrans = (newTransObj) => {
  return TransSchema(newTransObj).save();
};

// read Trans @filter munst be an object {}
export const getTransByUserId = (userId) => {
  return TransSchema.find();
};

// delete Trans

export const deleteTransById = (idArg, userId) => {
  return TransSchema.deleteMany({
    _id: { $in: idArg },
    userId,
  });
};
