import { AsyncHandler, ApiResponse } from "../../../src/utils/index.js";
import { MessageUser, UserChats } from "../../models/user/index.js";
import mongoose from "mongoose";
import { io } from "../../app.js";

const fetchMessageList = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (!id || !mongoose.isValidObjectId(id)) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Valid user id is required"));
    } else {
      const userChats = await UserChats.findOne({ userId: id }).populate({
        path: "chats",
        populate: {
          path: "senderId receiverId",
          model: "User",
        },
      });
      return res
        .status(200)
        .json(new ApiResponse(200, userChats, "These are all the chats"));
    }
  } catch (error) {
    console.log(`error while fetching all the messaged ${error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "error while fetching all the messages")
      );
  }
});

const createMessage = AsyncHandler(async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  try {
    if (!senderId || !receiverId || !content || !content.message) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            null,
            "senderId, receiverId, and message content are required"
          )
        );
    }

    let existingMessage = await MessageUser.findOne({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    if (!existingMessage) {
      // If the message does not exist, create a new one
      existingMessage = new MessageUser({
        senderId: senderId,
        receiverId: receiverId,
        content: [],
      });
    }

    // Add the new message to the conversation
    existingMessage.content.push({
      senderId: senderId,
      receiverId: receiverId,
      message: content.message,
    });

    await existingMessage.save();

    // Find or create UserChats document for the sender
    let senderUserChat = await UserChats.findOneAndUpdate(
      { userId: senderId },
      { $addToSet: { chats: existingMessage._id } }, // Add the message ID to the chats array
      { upsert: true, new: true }
    );

    // Find or create UserChats document for the receiver
    let receiverUserChat = await UserChats.findOneAndUpdate(
      { userId: receiverId },
      { $addToSet: { chats: existingMessage._id } }, // Add the message ID to the chats array
      { upsert: true, new: true }
    );

    try {
      io.to(receiverUserChat.userId).emit("new_message", content.message);
      console.log(
        `message send to the ${receiverUserChat.userId} and this the message  ${content.message}`
      );
    } catch (error) {
      console.log(`error while sending the message to the user from socket`);
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { senderId, receiverId, message: content.message },
          "Message sent successfully"
        )
      );
  } catch (error) {
    console.error(`Error while sending message: ${error}`);
    return res
      .status(500)
      .json(
        new ApiResponse(500, error, "Internal error while creating new message")
      );
  }
});

export { fetchMessageList, createMessage };
