import express from "express";
import { signup, signin } from "../controller/users.js";

const route = express.Router();

route.post("/signin", signin);
route.post("/signup", signup);

export default route;
