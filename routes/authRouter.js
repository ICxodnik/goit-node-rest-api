import express from "express";
import controller from "../controllers/authControllers.js";
import { authSchema } from "../schemas/authSchemas.js";
import validateBody from "../helpers/validateBody.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), controller.register);

authRouter.post("/login", validateBody(authSchema), controller.logIn);

authRouter.post("/logout", controller.logOut);

authRouter.post("/current", controller.getCurrentUser);

authRouter.post("/subscription", validateBody(authSchema), controller.updateToken);

export default authRouter;
