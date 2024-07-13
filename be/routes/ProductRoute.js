import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/Products";
const router = express.Router();

router.get("/Products", getProducts);
router.get("/Products/:id", getProductById);
router.post("/Products", createProduct);
router.patch("/Products/:id", updateProduct);
router.delete("/Products/:id", deleteProduct);

export default router;
