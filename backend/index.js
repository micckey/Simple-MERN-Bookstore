import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoutes from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Handling cors policy
app.use(cors());

app.use("/books", booksRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App Connected to DB");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack Tutorial");
});
