import mongoose from "mongoose";

const userChatsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MessageUser",
      },
    ],
  },
  { timestamps: true }
);

const UserChats = mongoose.model("UserChat", userChatsSchema);
export default UserChats;
