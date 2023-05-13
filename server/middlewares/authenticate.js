import admin from "firebase-admin";

export async function authenticateToken(req, res, next) {
  const jwt = req.headers.authorization;
  if (!jwt) return res.status(401).json({ message: "Usuário não autorizado!" });

  let decodedToken = "";
  try {
    decodedToken = await admin.auth().verifyIdToken(jwt, true);
  } catch (e) {
    return res.status(401).json({ message: "Usuário não autorizado!" });
  }

  next();
}
