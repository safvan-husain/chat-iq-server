import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  senderId: String,
  receiverId: String,
  msgText: string;
  isRead: boolean;
  createdAt: Date;
}

const messageSchema: Schema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    msgText: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model<Message>("Message", messageSchema);

export { MessageModel, messageSchema };
