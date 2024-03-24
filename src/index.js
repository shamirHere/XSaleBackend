import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { app } from "./app.js";
dotenv.config();

connectDB()
  .then(() => {
    app.listen(4554, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("MONGO db connection failed !! ", err));
