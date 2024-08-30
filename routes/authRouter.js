import express from "express";
import controller from "../controllers/authControllers.js";
import { authSchema, subscriptionSchema } from "../schemas/authSchemas.js";
import validateBody from "../middleware/validateBody.js";
import authenticate from "../middleware/authenticate.js";
import fileLoader from "../middleware/fileLoader.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), controller.register);

authRouter.post("/login", validateBody(authSchema), controller.logIn);

authRouter.post("/logout", authenticate, controller.logOut);

authRouter.get("/current", authenticate, controller.getCurrentUser);

authRouter.patch("/subscription", authenticate, validateBody(subscriptionSchema), controller.updateSubscription);

authRouter.patch("/avatars", authenticate, fileLoader.single("avatarUrl"), controller.updateAvatar);

authRouter.patch("/verify/:verificationToken", controller.verifyToken);

export default authRouter;
