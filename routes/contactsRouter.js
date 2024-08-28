import express from "express";
import controller from "../controllers/contactsControllers.js";
import { createContactSchema, updateContactSchema, toggleFavSchema } from "../schemas/contactsSchemas.js";
import validateBody from "../middleware/validateBody.js";
import authenticate from "../middleware/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", controller.getAllContacts);

contactsRouter.get("/:id", controller.getOneContact);

contactsRouter.delete("/:id", controller.deleteContact);

contactsRouter.patch("/:id/favorite", validateBody(toggleFavSchema), controller.updateStatusContact);

contactsRouter.post("/", validateBody(createContactSchema), controller.createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), controller.updateContact);

export default contactsRouter;
