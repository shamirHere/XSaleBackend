import { Router } from "express";
import {
  createCowBuffalo,
  getAllCowBuffalo,
  updateCowBuffalo,
  getSingleCowBuffalo,
  deleteCowBuffalo,
} from "../controllers/listing/animals/cow_buffalo.controller.js";
import {
  createBull,
  getAllBulls,
  getSingleBull,
  updateBull,
  deleteBull,
} from "../controllers/listing/animals/bull.controller.js";

import {
  createDog,
  getAllDog,
  getSingleDog,
  updateDog,
  deleteDog,
} from "../controllers/listing/animals/dog.controller.js";

import {
  createDonkey,
  getAllDonkeys,
  getSingleDonkey,
  updateDonkey,
  deleteDonkey,
} from "../controllers/listing/animals/donkey.controller.js";
import {
  createGoatSheep,
  getAllGoatSheep,
  getSingleGoatSheep,
  updateGoatSheep,
  deleteGoatSheep,
} from "../controllers/listing/animals/goat_sheep.controller.js";

const router = Router();

// for cows and buffalo
router.route("/fetch/cowbuffalo").get(getAllCowBuffalo);
router.route("/fetch/singleCowBuffalo").get(getSingleCowBuffalo);
router.route("/create/cowbuffalo").post(createCowBuffalo);
router.route("/update/cowBuffalo").post(updateCowBuffalo);
router.route("/delete/cowBuffalo").post(deleteCowBuffalo);

// for bulls
router.route("/fetch/bull").get(getAllBulls);
router.route("/fetch/singlebull").get(getSingleBull);
router.route("/create/bull").post(createBull);
router.route("/update/bull").post(updateBull);
router.route("/delete/bull").post(deleteBull);

// for dogs
router.route("/fetch/dog").get(getAllDog);
router.route("/fetch/singleDog").get(getSingleDog);
router.route("/create/dog").post(createDog);
router.route("/update/dog").post(updateDog);
router.route("/delete/dog").post(deleteDog);

// for donkeys
router.route("/fetch/donkey").get(getAllDonkeys);
router.route("/fetch/singleDonkey").get(getSingleDonkey);
router.route("/create/donkey").post(createDonkey);
router.route("/update/donkey").post(updateDonkey);
router.route("/delete/donkey").post(deleteDonkey);

// for goat sheep
router.route("/fetch/goatSheep").get(getAllGoatSheep);
router.route("/fetch/singleGoatSheep").get(getSingleGoatSheep);
router.route("/create/goatSheep").post(createGoatSheep);
router.route("/update/goatSheep").post(updateGoatSheep);
router.route("/delete/goatSheep").post(deleteGoatSheep);

export default router;
