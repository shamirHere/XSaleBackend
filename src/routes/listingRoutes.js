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
import {
  createOtherAnimal,
  getAllOtherAnimals,
  getSingleOtherAnimal,
  updateOtherAnimal,
  deleteOtherAnimal,
} from "../controllers/listing/animals/otherAnimal.controller.js";

import {
  createHorseCat,
  getAllHorseCat,
  getSingleHorseCat,
  updateHorseCat,
  deleteHorseCat,
} from "../controllers/listing/animals/horse_cat.contoroller.js";
import { getAllItems } from "../controllers/listing/items/items.controller.js";

import {
  createBicycle,
  getAllBicycle,
  getSingleBicycle,
  updateBicycle,
  deleteBicycle,
} from "../controllers/listing/bike/bicycle.controller.js";

import {
  createBikeScooty,
  getAllBikeScooty,
  getSingleBikeScooty,
  updateBikeScooty,
  deleteBikeScooty,
} from "../controllers/listing/bike/motorcycle_scooty.controller.js";

import {
  createSparePart,
  getAllSpareParts,
  getSingleSpartPart,
  updateSparePart,
  deleteSparePart,
} from "../controllers/listing/bike/spareParts.controller.js";

import {
  createCar,
  getAllCar,
  getSingleCar,
  updateCar,
  deleteCar,
} from "../controllers/listing/vehicle/car.controller.js";

import {
  createCarRent,
  getAllCarRent,
  getSingleCarRent,
  updateCarRent,
  deleteCarRent,
} from "../controllers/listing/vehicle/carRent.controller.js";

import {
  createCameraLense,
  getAllCameraLenses,
  getSingleCameraLense,
  updateCameraLense,
  deleteCameraLense,
} from "../controllers/listing/electronics/camera_lenses.controller.js";

import {
  createComputerLaptop,
  getSingleComputerLaptop,
  updateComputerLaptop,
  deleteComputerLaptop,
  getAllComputerLaptop,
} from "../controllers/listing/electronics/computer_laptop.controller.js";

import {
  createCoolerFan,
  getAllCoolerFans,
  getSingleCoolerFan,
  updateCoolerFan,
  deleteCoolerFan,
} from "../controllers/listing/electronics/cooler_fan.controller.js";

import {
  createFridgeAc,
  getAllFridgeAc,
  getSingleFridgeAc,
  updateFridgeAc,
  deleteFridgeAc,
} from "../controllers/listing/electronics/fridge_ac.controller.js";

import {
  createGameEntertainment,
  getAllcreateGameEntertainment,
  getSingleGameEntertainment,
  updateGameEntertainment,
  deleteGameEntertainment,
} from "../controllers/listing/electronics/games_entertainment.controller.js";

import {
  createKitchenAppliance,
  getAllKitchenAppliance,
  getSingleKitchenAppliance,
  updateKitchenAppliance,
  deleteKitchenAppliance,
} from "../controllers/listing/electronics/kitchenAppliance.controller.js";
import {
  createComputerAccessories,
  getAllComputerAccessories,
  getSingleComputerAccessories,
  updateComputerAccessories,
  deleteComputerAccessories,
} from "../controllers/listing/electronics/computerAccessories.js";
import {
  createTv,
  deleteTv,
  getAllTv,
  getSingleTv,
  updateTv,
} from "../controllers/listing/electronics/tv.controller.js";
import {
  createWashingMachine,
  deleteWashingMachine,
  getAllWashingMachine,
  getSingleWashingMachine,
  updateWashingMachine,
} from "../controllers/listing/electronics/washingMachine.controller.js";

import { getCategory } from "../controllers/listing/category/category.controller.js";
import { getSubCategory } from "../controllers/listing/category/subCategory.controller.js";
import { getAllSubItem } from "../controllers/listing/category/item.controller.js";

import {
  createFarmMachine,
  getAllFarmMachine,
  getSingleFarmMachine,
  updateFarmMachine,
  deleteFarmMachine,
} from "../controllers/listing/farmMachine/farmMachine.controller.js";

import {
  createFashion,
  getAllFashion,
  getSingleFashion,
  updateFashion,
  deleteFashion,
} from "../controllers/listing/fashion/fashion.controller.js";

import {
  createFurniture,
  getAllFurniture,
  getSingleFurniture,
  updateFurniture,
  deleteFurniture,
} from "../controllers/listing/furniture/furniture.controller.js";

import {
  createJob,
  getAllJob,
  getSingleJob,
  updateJob,
  deleteJob,
} from "../controllers/listing/jobs/jobs.controller.js";

import {
  createBride_Groom,
  getAllBride_Groom,
  getSingleBride_Groom,
  updateBride_Groom,
  deleteBride_Groom,
} from "../controllers/listing/matrimonial/groom_bride.controller.js";

import {
  createPhone,
  getAllPhone,
  getSinglePhone,
  updatePhone,
  deletePhone,
} from "../controllers/listing/mobile/phone.controller.js";

import {
  createTablet,
  getAllTablet,
  getSingleTablet,
  updateTablet,
  deleteTablet,
} from "../controllers/listing/mobile/tablet.controller.js";

import {
  createAccessories,
  getAllAccessories,
  getSingleAccessories,
  updateAccessories,
  deleteAccessories,
} from "../controllers/listing/mobile/accessories.controller.js";

const router = Router();

//  -----------------------------------------

// for all the
router.route("/fetch/items").get(getAllItems);

// for all the items in a seperate category
router.route("/fetch/category/:category").get(getCategory);

// for all the sub category inside the category
router.route("/fetch/subcategory/:subcategory").get(getSubCategory);

router.route("/fetch/subItem/:category/:subItem").get(getAllSubItem);

//  -----------------------------------------

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

// for horse cat
router.route("/fetch/horseCat").get(getAllHorseCat);
router.route("/fetch/singleHorseCat").get(getSingleHorseCat);
router.route("/create/horseCat").post(createHorseCat);
router.route("/update/horseCat").post(updateHorseCat);
router.route("/delete/horseCat").post(deleteHorseCat);

// for other animal
router.route("/fetch/otherAnimal").get(getAllOtherAnimals);
router.route("/fetch/singleOtherAnimal").get(getSingleOtherAnimal);
router.route("/create/otherAnimal").post(createOtherAnimal);
router.route("/update/otherAnimal").post(updateOtherAnimal);
router.route("/delete/otherAnimal").post(deleteOtherAnimal);

// for bicycle
router.route("/fetch/bicycle").get(getAllBicycle);
router.route("/fetch/singleBicyle").get(getSingleBicycle);
router.route("/create/bicyle").post(createBicycle);
router.route("/update/bicycle").post(updateBicycle);
router.route("/delete/bicyle").post(deleteBicycle);

// for motorcycle
router.route("/fetch/motorCycle").get(getAllBikeScooty);
router.route("/fetch/singleMotorCycle").get(getSingleBikeScooty);
router.route("/create/motorCycle").post(createBikeScooty);
router.route("/update/motorCycle").post(updateBikeScooty);
router.route("/delete/motorCycle").post(deleteBikeScooty);

// for spare parts
router.route("/fetch/spareParts").get(getAllSpareParts);
router.route("/fetch/singleSparePart").get(getSingleSpartPart);
router.route("/create/spareParts").post(createSparePart);
router.route("/update/spareParts").post(updateSparePart);
router.route("/delete/spareParts").post(deleteSparePart);

//  for car
router.route("/fetch/car").get(getAllCar);
router.route("/fetch/singleCar").get(getSingleCar);
router.route("/create/car").post(createCar);
router.route("/update/car").post(updateCar);
router.route("/delete/car").post(deleteCar);

// for car rent
router.route("/fetch/carRent").get(getAllCarRent);
router.route("/fetch/singleCarRent").get(getSingleCarRent);
router.route("/create/carRent").post(createCarRent);
router.route("/update/carRent").post(updateCarRent);
router.route("/delete/carRent").post(deleteCarRent);

// electronics start

// for camera lenses
router.route("/fetch/cameraLense").get(getAllCameraLenses);
router.route("/fetch/singleCameraLense").get(getSingleCameraLense);
router.route("/create/cameraLense").post(createCameraLense);
router.route("/update/cameraLense").post(updateCameraLense);
router.route("/delete/cameraLense").post(deleteCameraLense);

// for computer laptop
router.route("/fetch/computerLaptop").get(getAllComputerLaptop);
router.route("/fetch/singleComputerLaptop").get(getSingleComputerLaptop);
router.route("/create/computerLaptop").post(createComputerLaptop);
router.route("/update/updateComputerLaptop").post(updateComputerLaptop);
router.route("/delete/deleteComputerLaptop").post(deleteComputerLaptop);

// for cooler fans
router.route("/fetch/coolerFan").get(getAllCoolerFans);
router.route("/fetch/singleCoolerFan").get(getSingleCoolerFan);
router.route("/create/coolerFan").post(createCoolerFan);
router.route("/update/updateCoolerFan").post(updateCoolerFan);
router.route("/delete/deleteCoolerFan").post(deleteCoolerFan);

// for fridge
router.route("/fetch/fridge").get(getAllFridgeAc);
router.route("/fetch/singleFridge").get(getSingleFridgeAc);
router.route("/create/fridge").post(createFridgeAc);
router.route("/update/updateFridge").post(updateFridgeAc);
router.route("/delete/deleteFridge").post(deleteFridgeAc);

// for games and entertainment
router.route("/fetch/gamesEntertainment").get(getAllcreateGameEntertainment);
router.route("/fetch/singleGamesEntertainment").get(getSingleGameEntertainment);
router.route("/create/gamesEntertainment").post(createGameEntertainment);
router.route("/update/updateGamesEntertainment").post(updateGameEntertainment);
router.route("/delete/deleteGamesEntertainment").post(deleteGameEntertainment);

// for kitchen applicances

router.route("/fetch/kitchenAppliance").get(getAllKitchenAppliance);
router.route("/fetch/singleKitchenAppliance").get(getSingleKitchenAppliance);
router.route("/create/kitchenAppliance").post(createKitchenAppliance);
router.route("/update/updateKitchenAppliance").post(updateKitchenAppliance);
router.route("/delete/deleteKitchenAppliance").post(deleteKitchenAppliance);

// printer and monitor
router.route("/fetch/computerAccessories").get(getAllComputerAccessories);
router
  .route("/fetch/singleComputerAccessories")
  .get(getSingleComputerAccessories);
router.route("/create/computerAccessories").post(createComputerAccessories);
router
  .route("/update/updateComputerAccessories")
  .post(updateComputerAccessories);
router
  .route("/delete/deleteComputerAccessories")
  .post(deleteComputerAccessories);

// for tv
router.route("/fetch/tv").get(getAllTv);
router.route("/fetch/singleTv").get(getSingleTv);
router.route("/create/tv").post(createTv);
router.route("/update/updateTv").post(updateTv);
router.route("/delete/deleteTv").post(deleteTv);

// for washing machine
router.route("/fetch/washingMachine").get(getAllWashingMachine);
router.route("/fetch/singleWashingMachine").get(getSingleWashingMachine);
router.route("/create/washingMachine").post(createWashingMachine);
router.route("/update/updateWashingMachine").post(updateWashingMachine);
router.route("/delete/deleteWashingMachine").post(deleteWashingMachine);

// farm machines
router.route("/fetch/farmMachine").get(getAllFarmMachine);
router.route("/fetch/singleFarmMachine").get(getSingleFarmMachine);
router.route("/create/farmMachine").post(createFarmMachine);
router.route("/update/updateFarmMachine").post(updateFarmMachine);
router.route("/delete/deleteFarmMachine").post(deleteFarmMachine);

// for fashion
router.route("/fetch/fashion").get(getAllFashion);
router.route("/fetch/singleFashion").get(getSingleFashion);
router.route("/create/fashion").post(createFashion);
router.route("/update/updateFashion").post(updateFashion);
router.route("/delete/deleteFashion").post(deleteFashion);

// for furniture
router.route("/fetch/furniture").get(getAllFurniture);
router.route("/fetch/singleFurniture").get(getSingleFurniture);
router.route("/create/furniture").post(createFurniture);
router.route("/update/updateFurniture").post(updateFurniture);
router.route("/delete/deleteFurniture").post(deleteFurniture);

// for job
router.route("/fetch/job").get(getAllJob);
router.route("/fetch/singleJob").get(getSingleJob);
router.route("/create/job").post(createJob);
router.route("/update/updateJob").post(updateJob);
router.route("/delete/deleteJob").post(deleteJob);

// for bride groom
router.route("/fetch/brideGroom").get(getAllBride_Groom);
router.route("/fetch/singleBrideGroom").get(getSingleBride_Groom);
router.route("/create/brideGroom").post(createBride_Groom);
router.route("/update/updateBrideGroom").post(updateBride_Groom);
router.route("/delete/deleteBrideGroom").post(deleteBride_Groom);

// for mobile
router.route("/fetch/phone").get(getAllPhone);
router.route("/fetch/singlePhone").get(getSinglePhone);
router.route("/create/phone").post(createPhone);
router.route("/update/updatePhone").post(updatePhone);
router.route("/delete/deletePhone").post(deletePhone);

// for tablet
router.route("/fetch/tablet").get(getAllTablet);
router.route("/fetch/singleTablet").get(getSingleTablet);
router.route("/create/tablet").post(createTablet);
router.route("/update/updateTablet").post(updateTablet);
router.route("/delete/deleteTablet").post(deleteTablet);

// for accessories
router.route("/fetch/accessories").get(getAllAccessories);
router.route("/fetch/singleAccessories").get(getSingleAccessories);
router.route("/create/accessories").post(createAccessories);
router.route("/update/updateAccessories").post(updateAccessories);
router.route("/delete/deleteAccessories").post(deleteAccessories);

export default router;
