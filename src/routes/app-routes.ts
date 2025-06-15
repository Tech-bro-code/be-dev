import express from "express"
import {AppController } from "../controller/app-contoller";
import { authMiddleware } from "../Middlewares/auth.middleware";
import { validator } from "../Middlewares/validator.middleware";
import { addUserSchema, userSchema } from "../validation/user-schema";


const router = express.Router();

router.get("/fetch", authMiddleware, AppController.getUserController)
router.post('/login', validator(userSchema) as any, AppController.loginController)
router.post("/add", validator(addUserSchema) as any, AppController.addUserController)
router.get("/user/:userId", AppController.getUserByIdController)
router.put("/update-location", AppController.updateUserLocation)
router.put("/update-user-by-id/:id", AppController.updateById)

router.put("/update-one/:id", AppController.updateOne)
router.patch("/update-many", AppController.updateMany)
router.delete("/delete-by-email", AppController.dltByMail)
router.delete("/delete-user/:deleteId", AppController.deleteUserByIDController)
// router.get("/home", sayHi)
// router.get("/users", users)

export default router;