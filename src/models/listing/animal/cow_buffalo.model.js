import mongoose from "mongoose";

const cow_buffalo_schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["cow", "buffalo"],
      required: [true, "type of the animal is required cow or buffalo"],
    },
    breed: {
      type: String,
      required: [true, "breed of the animal is required"],
    },
    lactation: {
      type: Number,
      required: [true, "lcatation cycle of the animal is required"],
    },
    currentCapacity: {
      type: Number,
    },
    maximumCapacity: {
      type: Number,
      required: [true, "maximum capacity per day is required"],
    },
    hasDeliveredBaby: {
      type: Boolean,
      default: false,
    },
    whenDelivered: {
      type: String,
    },
    hasCalf: {
      type: Boolean,
      default: false,
    },
    isPregnant: {
      type: Boolean,
      default: false,
    },
    monthsPregnant: {
      type: Number,
      default: false,
    },
    additionalInformation: {
      type: String,
    },
    media: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            const urlRegex = /^(http|https):\/\/[^\s]+/;
            return urlRegex.test(value);
          },
          message:
            "Invalid media URL. Please enter a valid image or video URL.",
        },
      },
    ],
    location: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    askingPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const CowBuffalo = mongoose.model("CowBuffalo", cow_buffalo_schema);
export default CowBuffalo;

// // Function to create a new cow or buffalo
// exports.createCowBuffalo = async (req, res) => {
//   try {
//     const newCowBuffalo = new CowBuffalo(req.body);
//     const savedCowBuffalo = await newCowBuffalo.save();
//     res.status(201).json(savedCowBuffalo); // Created (201) status with the saved document
//   } catch (err) {
//     console.error('Error creating cow/buffalo:', err);
//     res.status(500).json({ message: 'Error creating cow/buffalo' }); // Internal Server Error (500)
//   }
// };

// // Function to get all cows or buffaloes
// exports.getAllCowBuffalo = async (req, res) => {
//   try {
//     const cowBuffaloes = await CowBuffalo.find();
//     res.status(200).json(cowBuffaloes); // OK (200) status with all documents
//   } catch (err) {
//     console.error('Error fetching all cow/buffalo:', err);
//     res.status(500).json({ message: 'Error fetching cow/buffalo' });
//   }
// };

// // Function to get a single cow or buffalo by ID
// exports.getSingleCowBuffalo = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const cowBuffalo = await CowBuffalo.findById(id).populate('location'); // Populate location if needed
//     if (!cowBuffalo) {
//       return res.status(404).json({ message: 'Cow/Buffalo not found' }); // Not Found (404)
//     }
//     res.status(200).json(cowBuffalo);
//   } catch (err) {
//     console.error('Error fetching single cow/buffalo:', err);
//     res.status(500).json({ message: 'Error fetching cow/buffalo' });
//   }
// };

// // Function to update a cow or buffalo by ID (implement as needed)
// exports.updateCowBuffalo = async (req, res) => {
//   const id = req.params.id;
//   const updates = req.body;
//   try {
//     const updatedCowBuffalo = await CowBuffalo.findByIdAndUpdate(id, updates, { new: true }); // Return updated document
//     if (!updatedCowBuffalo) {
//       return res.status(404).json({ message: 'Cow/Buffalo not found' });
//     }
//     res.status(200).json(updatedCowBuffalo);
//   } catch (err) {
//     console.error('Error updating cow/buffalo:', err);
//     res.status(500).json({ message: 'Error updating cow/buffalo' });
//   }
// };

// // Function to delete a cow or buffalo by ID (implement as needed)
// exports.deleteCowBuffalo = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const deletedCowBuffalo = await CowBuffalo.findByIdAndDelete(id);
//     if (!deletedCowBuffalo) {
//       return res.status(404).json({ message: 'Cow/Buffalo not found' });
//     }
//     res.status(200).json({ message: 'Cow/Buffalo deleted' });
//   } catch (err) {
//     console.error('Error deleting cow/buffalo:', err);
//     res.status(500).json({ message: 'Error deleting cow/buffalo' });
//   }
// };
