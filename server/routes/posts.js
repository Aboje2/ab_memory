import express from "express";
import auth from "../middleware/auth.js";
import {
  getPost,
  getPosts,
  createPost,
  updatePosts,
  deletePost,
  likePost,
  getPostBySearch,
} from "../controller/posts.js";

const routes = express.Router();

routes.get("/", getPosts);
routes.get("/:id", getPost);
routes.get("/search/check", getPostBySearch);
routes.post("/", auth, createPost);
routes.patch("/:id", auth, updatePosts);
routes.delete("/:id", auth, deletePost);
routes.patch("/:id/likepost", auth, likePost);
export default routes;
