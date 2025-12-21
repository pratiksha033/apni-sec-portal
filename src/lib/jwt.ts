import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function signAccessToken(payload: any) {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, SECRET);
}
