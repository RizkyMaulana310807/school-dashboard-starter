import { hashPassword, comparePassword } from "./lib/password.js";

const password = "admin123";

const hash = await hashPassword(password);

console.log(hash);

console.log(await comparePassword(password, hash));