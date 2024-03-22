import { ApiError, AsyncHandler, ApiResponse } from "../../../utils/index.js";
import cowBuffalo from "../../../models/listing/animal/cow_buffalo.model.js";

const cow_buffaloController = AsyncHandler(async (req, res) => {
  const {
    type,
    breed,
    lactation,
    currentCapacity,
    maximumCapacity,
    hasDeliverdBaby,
    whenDelivered,
    hasCalf,
    isPregnant,
    monthsPregnant,
    images,
    location,
    askingPrice,
  } = req.body;

  const createdAnimal = await cowBuffalo.create({
    type,
    breed,
    lactation,
    currentCapacity,
    maximumCapacity,
    hasDeliverdBaby,
    whenDelivered,
    hasCalf,
    isPregnant,
    monthsPregnant,
    images,
    location,
    askingPrice,
  });
  const find = await cowBuffalo.find();
  res.send(find);
});

export default cow_buffaloController;
