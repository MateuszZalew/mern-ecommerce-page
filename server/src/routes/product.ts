import { Router, Request, Response } from "express";
import { ProductModel } from "../models/product";
import { UserModel } from "../models/user";
import { ProductErrors, UserErrors } from "../errors";

const router = Router();

router.get("/", async (_, res: Response) => {
  try {
    const products = await ProductModel.find({});
    res.json({ products });
  } catch (error) {
    res.status(400).json({ error });
  }
});

export { router as productRouter };
