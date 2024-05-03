import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { server } from "./app.js";

dotenv.config();

connectDB()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("MONGO db connection failed !! ", err));
