export class ProductIdNotInformedError extends Error {
  constructor() {
    super("Id do produto não informado!");
    this.name = "product-id-not-informed";
    this.code = 500;
  }
}
