import express from "express";
const router = express.Router();
import { createUser, getUser, getUsers, deleteUser } from "../controllers/user";
import {
    userHasValidBody,
    userHasValidID,
} from "../middlewares/validation/index";

router.post("/users", userHasValidBody, createUser);

router.get("/users", getUsers);

router.get("/users/:id", userHasValidID, getUser);

router.delete("/users/:id", userHasValidID, deleteUser);

export default router;
