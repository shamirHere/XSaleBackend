import mongoose from "mongoose";

const printer_monitorSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      enum: ["printer", "monitor"],
    },
    additionalInformation: {
      type: String,
      required: true,
    },
    images: [{ type: String, required: true }],
    location: {
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
const PrinterMonitor = mongoose.model("PrinterMonitor", printer_monitorSchema);
export default PrinterMonitor;
