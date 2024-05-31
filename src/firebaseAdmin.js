import { fileURLToPath } from "url";
import { dirname, join } from "path";
import admin from "firebase-admin";

// Get the directory path of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

const serviceAccount = join(
  __dirname,
  "config",
  "x-sale-da7c4-firebase-adminsdk-f4fe0-22e1b89dc1.json"
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
export default admin;
