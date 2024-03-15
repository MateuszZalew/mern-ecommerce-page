import express from "express";
import cors from "cors";
import "dotenv/config";
import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";
const connectDB = require("./db/connect");
const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/product", productRouter);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
