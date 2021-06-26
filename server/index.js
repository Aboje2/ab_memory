import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.get("/", (res, req) => {
  res.send("Welcome to memories API");
});

const PORT = process.env.PORT || 5000;
// const CONNECTION_URL =
//   "mongodb+srv://solomon2:Default85@cluster0.s44zd.mongodb.net/solomon?retryWrites=true&w=majority";
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log("listening on port " + PORT);
    })
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
