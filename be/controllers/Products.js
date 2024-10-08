import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";

export const getProducts = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Products.findAll({
        include: [{ model: Users }],
      });
    } else {
      response = await Products.findAll({
        where: {
          userId: req.userId,
        },
        include: [{ model: Users }],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getProductById = async (req, res) => {};
export const createProduct = async (req, res) => {};
export const updateProduct = async (req, res) => {};
export const deleteProduct = async (req, res) => {};
