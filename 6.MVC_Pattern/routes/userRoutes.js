const express = require("express");

const userController = require("../controller/user");

const userRouter = express.Router();

userRouter
  .post("/", userController.createuser)

  .get("/", userController.getAllUser)

  .get("/:id", userController.getUserById)

  .put("/:id", userController.updateUserUsingPut)

  .patch("/:id", userController.updateUserUsingPatch)

  .delete("/:id", userController.deleteUserById);

module.exports = userRouter;
