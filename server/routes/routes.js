import express from "express";
import { authenticateToken } from "../middlewares/authenticate.js";
import { ProductsController } from "../controllers/controller-products.js";
import { validateCreateProduct } from "../validators/product.validator.js";

const app = express();
const productsController = new ProductsController();

//Rota get para listar produtos
app.get(
  "/:orderBy",
  (req, res, next) => authenticateToken(req, res, next),
  (req, res) => productsController.getProducts(req, res)
);

//Rota get para buscar produto por id
app.get(
  "/get-by-id/:id",
  (req, res, next) => authenticateToken(req, res, next),
  (req, res) => productsController.getProductById(req, res)
);

//Rota post para criar produto
app.post(
  "/",
  (req, res, next) => authenticateToken(req, res, next),
  (req, res, next) => validateCreateProduct(req, res, next),
  (req, res) => productsController.createProduct(req, res)
);

//Rota put para atualizar produto
app.put(
  "/",
  (req, res, next) => authenticateToken(req, res, next),
  (req, res, next) => validateCreateProduct(req, res, next),
  (req, res) => productsController.updateProduct(req, res)
);

//Rota para deletar produto
app.delete(
  "/:id",
  (req, res, next) => authenticateToken(req, res, next),
  (req, res) => productsController.deleteProduct(req, res)
);

export const router = app;
