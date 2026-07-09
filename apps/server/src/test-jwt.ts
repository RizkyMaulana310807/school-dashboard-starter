import {
  generateAccessToken,
  verifyAccessToken,
} from "./lib/jwt.js";

const token = generateAccessToken({
  userId: "123",
  email: "admin@example.com",
});

console.log(token);

const payload = verifyAccessToken(token);

console.log(payload);