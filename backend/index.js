import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose, { mongo } from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//middleware for parsing request body
app.use(express.json());

//Middleware for handling cors policy
//option 1: allow all origin with default of cors(*)
app.use(cors());
// option 2: allow all custom origin
// app.use(
//   cors({
//     origin: "http://localhost:5555",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to Mern Stack");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to database");
    app.listen(PORT, () => {
      console.log(`Server UP on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
