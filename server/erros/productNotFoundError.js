export class ProductNotFoundError extends Error {
  constructor() {
    super("Produto não encontrado!");
    this.name = "product-not-found";
    this.code = 404;
  }
}
