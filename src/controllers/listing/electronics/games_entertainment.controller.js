import { AsyncHandler, ApiResponse } from "../../../utils/index.js";
import { GameEntertainment } from "../../../models/listing/electronics/index.js";
import Item from "../../../models/listing/items/items.models.js";

const createGameEntertainment = AsyncHandler(async (req, res) => {
  const {
    user,
    productType,
    title,
    description,
    media,
    location,
    askingPrice,
  } = req.body;

  try {
    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(400, user, "id of the user is required"));
    } else if (!productType) {
      return res
        .status(400)
        .json(new ApiResponse(400, productType, "product type is required"));
    } else if (!title) {
      return res
        .status(400)
        .json(new ApiResponse(400, type, "title is required"));
    } else if (!description) {
      return res
        .status(400)
        .json(new ApiResponse(400, brand, "description is required"));
    } else if (media.length === 0) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, media, "atleast one image or video is required")
        );
    } else if (!location) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            location,
            "location of the game / entertainment is required"
          )
        );
    } else if (!askingPrice) {
      return res
        .status(400)
        .json(new ApiResponse(400, askingPrice, "asking price is required"));
    } else {
      const newGameEntertainment = new GameEntertainment(req.body);
      const savedGameEntertainment = new newGameEntertainment.save();
      const gameEntertainment_location_user = await GameEntertainment.find(
        savedGameEntertainment._id
      ).populate({ path: "user", populate: { path: "location" } });
      const item = new Item({
        item: gameEntertainment_location_user,
        location: gameEntertainment_location_user[0].location,
      });
      const savedInItems = await item.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            gameEntertainment_location_user,
            "game / entertainment listing created successfully"
          )
        );
    }
  } catch (error) {
    console.log(
      `error while creating a new games and entertainment fan ${error}`
    );
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while creating the new games and entertainment"
        )
      );
  }
});
const getAllcreateGameEntertainment = AsyncHandler(async (req, res) => {
  try {
    const games_entertainment = await GameEntertainment.find().populate({
      path: "user",
      populate: {
        path: "location",
      },
    });
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          games_entertainment,
          "these are all the games_entertainment fans"
        )
      );
  } catch (error) {
    console.log("error while fetching all the games_entertainment fans", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "error while fetching all the games_entertainment "
        )
      );
  }
});
const getSingleGameEntertainment = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const gameEntertainment = await GameEntertainment.findOne({ _id }).populate(
      {
        path: "user",
        populate: { path: "location" },
      }
    );
    if (!gameEntertainment) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            gameEntertainment,
            "the gameEntertainment does not exist"
          )
        );
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          gameEntertainment,
          "gameEntertainment fetched successfully"
        )
      );
  } catch (error) {
    console.log("error while fetching single game entertainment", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "error while fething single game/emtertainment"
        )
      );
  }
});
const updateGameEntertainment = AsyncHandler(async (req, res) => {
  const { _id, title, description, media, location, askingPrice } = req.body;
  try {
    if (!_id) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "_id the of the document is required"));
    }
    const updatedGameEntertainment = await GameEntertainment.findByIdAndUpdate(
      _id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedGameEntertainment) {
      return res
        .status(404)
        .json(
          new ApiResponse(
            404,
            updatedGameEntertainment,
            "game and entertaiment not found"
          )
        );
    } else if (updatedGameEntertainment) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedGameEntertainment,
            "your listing for this game / entertainment updated"
          )
        );
    }
  } catch (error) {
    console.log("error while updating the game/entertainment", error);
    return res
      .status(500)
      .json(
        new ApiResponse(500, "", "erorr while updating the game/entertainment")
      );
  }
});
const deleteGameEntertainment = AsyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      return res
        .send(400)
        .json(
          new ApiResponse(400, _id, "please provide the id of the document")
        );
    }
    const deletedGameEntertainment = await GameEntertainment.findByIdAndDelete(
      _id
    );
    if (!deletedGameEntertainment) {
      return res
        .status(400)
        .json(new ApiResponse(400, _id, "game / entertainment does not exist"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, "", "game / entertainment deleted successfully")
      );
  } catch (error) {
    console.log("error while deleting the game / entertainment", error);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          error,
          "internal server error while game / entertainment"
        )
      );
  }
});

export {
  createGameEntertainment,
  getAllcreateGameEntertainment,
  getSingleGameEntertainment,
  updateGameEntertainment,
  deleteGameEntertainment,
};
