import { Router } from "express";
import { cow_buffaloController } from "../controllers/listing/animals/index.js ";

const router = Router();

router.route("/cowbuffalo").post(cow_buffaloController);

export default router;
