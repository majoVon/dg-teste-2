import { badRequestError } from "../erros/badRequestError.js";

export function validateCreateProduct(req, res, next) {
  //Nome
  const name = req.body.name;
  if (!name) {
    return res
      .status(400)
      .json(new badRequestError("Nome do produto não informado!"));
  }

  //Departamento
  const department = req.body.name;
  if (!department) {
    return res
      .status(400)
      .json(new badRequestError("Departamento não informado!"));
  }
  //Preço
  const price = req.body.price;
  if (!price) {
    return res.status(400).json(new badRequestError("Preço não informado!"));
  }
  if (isNaN(price)) {
    return res.status(400).json(new badRequestError("Preço inválido!"));
  }

  next();
}
