import { Product } from "../models/products.model.js";

export class ProductsController {
  getProducts(req, res) {
    const product = new Product();
    product
      .getProducts(req.params?.orderBy)
      .then((products) => res.json(products))
      .catch((err) => res.status(err?.code).json(err));
  }

  async getProductById(req, res) {
    const product = new Product();
    return product
      .getProductById(req.params?.id)
      .then((product) => res.status(200).json(product))
      .catch((err) => res.status(err?.code).json(err));
  }

  createProduct(req, res) {
    const product = new Product();

    return product
      .createProduct(req.body)
      .then((product) => res.status(200).json(product))
      .catch((err) => res.status(err?.code).json(err));
  }

  async updateProduct(req, res) {
    const product = new Product();

    return product
      .updateProduct(req.body)
      .then((product) => res.status(200).json(product))
      .catch((err) => res.status(err.status).json(err));
  }

  async deleteProduct(req, res) {
    const product = new Product();

    return product
      .deleteProduct(req.params?.id)
      .then(() => res.status(200).json({}))
      .catch((err) => res.status(err.status).json(err));
  }
}
