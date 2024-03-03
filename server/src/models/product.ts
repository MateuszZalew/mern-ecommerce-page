import { Schema, model } from "mongoose";
import { IProduct } from "../types";

const ProductSchema = new Schema<IProduct>({
  productName: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: [1, "Product price should be above 1."],
  },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  stockQuantity: {
    type: Number,
    required: true,
    min: [0, "Stock quantity cannot be negative."],
  },
});

export const ProductModel = model<IProduct>("product", ProductSchema);
