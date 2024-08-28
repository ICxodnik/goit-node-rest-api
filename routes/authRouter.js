import express from "express";
import controller from "../controllers/authControllers.js";
import { authSchema } from "../schemas/authSchemas.js";
import validateBody from "../middleware/validateBody.js";
import authenticate from "../middleware/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), controller.register);

authRouter.post("/login", validateBody(authSchema), controller.logIn);

authRouter.post("/logout", authenticate, controller.logOut);

authRouter.post("/current", authenticate, controller.getCurrentUser);

authRouter.post("/subscription", authenticate, validateBody(authSchema), controller.updateSubscription);

export default authRouter;
