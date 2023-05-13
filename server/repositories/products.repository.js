import admin from "firebase-admin";

export class ProductsRepository {
  #collection = "products";
  async getProducts(orderBy) {
    return admin
      .firestore()
      .collection(this.#collection)
      .orderBy(orderBy, "asc")
      .get()
      .then((spanpshot) => {
        return spanpshot.docs.map((doc) => ({
          ...doc.data(),
        }));
      });
  }

  async getProductById(id) {
    return admin
      .firestore()
      .collection(this.#collection)
      .doc(id)
      .get()
      .then((spanpshot) => spanpshot.data());
  }

  createProduct(product) {
    return admin
      .firestore()
      .collection(this.#collection)
      .doc(product?.id)
      .set(JSON.parse(JSON.stringify(product)));
  }

  updateProduct(product) {
    return admin
      .firestore()
      .collection(this.#collection)
      .doc(product?.id)
      .update({
        name: product?.name,
        department: product?.department,
        price: product?.price,
        sales: product?.sales,
      });
  }

  deleteProduct(id) {
    return admin.firestore().collection(this.#collection).doc(id).delete();
  }
}
