import { badRequestError } from "../erros/badRequestError.js";
import { ProductIdNotInformedError } from "../erros/productIdNotInformedError.js";
import { ProductNotFoundError } from "../erros/productNotFoundError.js";
import { ProductsRepository } from "../repositories/products.repository.js";

export class Product {
  name;
  department;
  price;
  sales;
  id;
  #repository;

  constructor() {
    this.#repository = new ProductsRepository();
  }

  createProduct(params) {
    this.name = params?.name;
    this.department = params?.department;
    this.price = params?.price;
    this.sales = params?.sales;
    this.id = params?.id;

    return this.#repository.createProduct(this);
  }

  async getProducts(orderBy) {
    return this.#repository.getProducts(orderBy);
  }

  getProductById(id) {
    if (!id) return Promise.reject(new ProductIdNotInformedError());
    return this.#repository.getProductById(id);
  }

  updateProduct(params) {
    if (!this.getProductById(params?.id))
      return Promise.reject(new ProductNotFoundError());
    this.name = params?.name;
    this.department = params?.department;
    this.price = params?.price;
    this.sales = params?.sales;
    this.id = params?.id;

    return this.#repository.updateProduct(this);
  }

  deleteProduct(id) {
    if (!id) return Promise.reject(new ProductIdNotInformedError());

    return this.#repository.deleteProduct(id);
  }
}
