import express, { json } from "express";
import admin from "firebase-admin";
import { router } from "./routes/routes.js";
import cors from "cors";

const app = express();

app.use(json());
app.use(cors());

app.use("/products", router);

admin.initializeApp({
  credential: admin.credential.cert("./accountKey.json"),
});

app.listen(3000, () => console.log("Api iniciada"));
