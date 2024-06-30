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
  createComputerAccessories,
  getAllComputerAccessories,
  getSingleComputerAccessories,
  updateComputerAccessories,
  deleteComputerAccessories,
} from "../controllers/listing/electronics/computerAccessories.js";

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
  createOtherElectronics,
  getAllcreateOtherElectronics,
  getSingleOtherElectronics,
  updateOtherElectronics,
  deleteOtherElectronics,
} from "../controllers/listing/electronics/otherElectronics.controller.js";

import {
  createKitchenAppliance,
  getAllKitchenAppliance,
  getSingleKitchenAppliance,
  updateKitchenAppliance,
  deleteKitchenAppliance,
} from "../controllers/listing/electronics/kitchenAppliance.controller.js";

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

import {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
} from "../controllers/listing/services/services.controller.js";

import {
  createChicken,
  getAllChickens,
  getSingleChicken,
  updateChicken,
  deleteChicken,
} from "../controllers/listing/poultry/chicken.controller.js";

import {
  createFish,
  getAllFishes,
  getSingleFish,
  updateFish,
  deleteFish,
} from "../controllers/listing/poultry/fish.controller.js";

import {
  createBird,
  getAllBirds,
  getSingleBird,
  updateBird,
  deleteBird,
} from "../controllers/listing/poultry/birds.controller.js";

import {
  createProperty,
  getAllProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/listing/property/property.controller.js";

import {
  createPropertyRent,
  getAllPropertiesRent,
  getSinglePropertyRent,
  updatePropertyRent,
  deletePropertyRent,
} from "../controllers/listing/property/propertyRent.controller.js";

import {
  createHostel,
  getAllHostel,
  getSingleHostel,
  updateHostel,
  deleteHostel,
} from "../controllers/listing/property/hostel.controller.js";

import {
  createLand,
  getAllLand,
  getSingleLand,
  updateLand,
  deleteLand,
} from "../controllers/listing/property/land.controller.js";

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

// for land
router.route("/fetch/land").get(getAllLand);
router.route("/fetch/singleLand").get(getSingleLand);
router.route("/create/land").post(createLand);
router.route("/update/land").post(updateLand);
router.route("/delete/land").post(deleteLand);

// for property
router.route("/fetch/properties").get(getAllProperties);
router.route("/fetch/singleProperty").get(getSingleProperty);
router.route("/create/property").post(createProperty);
router.route("/update/property").post(updateProperty);
router.route("/delete/property").post(deleteProperty);

// for property rent
router.route("/fetch/propertiesRent").get(getAllPropertiesRent);
router.route("/fetch/singlePropertyRent").get(getSinglePropertyRent);
router.route("/create/propertyRent").post(createPropertyRent);
router.route("/update/propertyRent").post(updatePropertyRent);
router.route("/delete/propertyRent").post(deletePropertyRent);

// for hostel and pg
router.route("/fetch/hostel").get(getAllHostel);
router.route("/fetch/singleHostel").get(getSingleHostel);
router.route("/create/Hostel").post(createHostel);
router.route("/update/hostel").post(updateHostel);
router.route("/delete/hostel").post(deleteHostel);

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
router.route("/create/bicycle").post(createBicycle);
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

// for computer laptop accessories

router.route("/fetch/laptopPcAccessories").get(getAllComputerAccessories);
router
  .route("/fetch/singleLaptopPcAccessories")
  .get(getSingleComputerAccessories);
router.route("/create/LaptopPcAccessories").post(createComputerAccessories);
router
  .route("/update/updateLaptopPcAccessories")
  .post(updateComputerAccessories);
router
  .route("/delete/deleteLaptopPcAccessories")
  .post(deleteComputerAccessories);

// for cooler fans
router.route("/fetch/coolerFans").get(getAllCoolerFans);
router.route("/fetch/singleCoolerFan").get(getSingleCoolerFan);
router.route("/create/coolerFan").post(createCoolerFan);
router.route("/update/updateCoolerFan").post(updateCoolerFan);
router.route("/delete/deleteCoolerFan").post(deleteCoolerFan);

// for fridge
router.route("/fetch/fridgeAC").get(getAllFridgeAc);
router.route("/fetch/singleFridgeAC").get(getSingleFridgeAc);
router.route("/create/fridgeAC").post(createFridgeAc);
router.route("/update/updateFridgeAC").post(updateFridgeAc);
router.route("/delete/deleteFridgeAC").post(deleteFridgeAc);

// for otherElectronics
router.route("/fetch/otherElectronics").get(getAllcreateOtherElectronics);
router.route("/fetch/singleOtherElectronics").get(getSingleOtherElectronics);
router.route("/create/OtherElectronics").post(createOtherElectronics);
router.route("/update/updateOtherElectronics").post(updateOtherElectronics);
router.route("/delete/deleteOtherElectronics").post(deleteOtherElectronics);

// for kitchen applicances

router.route("/fetch/kitchenAppliances").get(getAllKitchenAppliance);
router.route("/fetch/singleKitchenAppliance").get(getSingleKitchenAppliance);
router.route("/create/kitchenAppliance").post(createKitchenAppliance);
router.route("/update/updateKitchenAppliance").post(updateKitchenAppliance);
router.route("/delete/deleteKitchenAppliance").post(deleteKitchenAppliance);

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

//  for services
router.route("/fetch/services").get(getAllServices);
router.route("/fetch/singleService").get(getSingleService);
router.route("/create/service").post(createService);
router.route("/update/updateService").post(updateService);
router.route("/delete/deleteService").post(deleteService);

//  for poultry $ birds

//  for chicken
router.route("/fetch/chickens").get(getAllChickens);
router.route("/fetch/singleChicken").get(getSingleChicken);
router.route("/create/chicken").post(createChicken);
router.route("/update/updateChicken").post(updateChicken);
router.route("/delete/deleteChicken").post(deleteChicken);

router.route("/fetch/fish").get(getAllFishes);
router.route("/fetch/singleFish").get(getSingleFish);
router.route("/create/fish").post(createFish);
router.route("/update/updateFish").post(updateFish);
router.route("/delete/deleteFish").post(deleteFish);

router.route("/fetch/birds").get(getAllBirds);
router.route("/fetch/singleBird").get(getSingleBird);
router.route("/create/bird").post(createBird);
router.route("/update/updateBird").post(updateBird);
router.route("/delete/deleteBird").post(deleteBird);

export default router;
