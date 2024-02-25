import express from "express";
import cors from "cors";
import "dotenv/config";
import { userRouter } from "./routes/user";
const connectDB = require("./db/connect");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3001, () => {
      console.log("Server is listening at http://localhost:3001");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
