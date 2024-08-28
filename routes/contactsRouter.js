import express from "express";
import controller from "../controllers/contactsControllers.js";
import { createContactSchema, updateContactSchema, toggleFavSchema } from "../schemas/contactsSchemas.js";
import validateBody from "../middleware.js/validateBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", controller.getAllContacts);

contactsRouter.get("/:id", controller.getOneContact);

contactsRouter.delete("/:id", controller.deleteContact);

contactsRouter.patch("/:id/favorite", validateBody(toggleFavSchema), controller.updateStatusContact);

contactsRouter.post("/", validateBody(createContactSchema), controller.createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), controller.updateContact);

export default contactsRouter;
