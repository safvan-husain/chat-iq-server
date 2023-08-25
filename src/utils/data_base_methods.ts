import { DataBaseException } from "../exception/exceptions";
import { Message, MessageModel } from "../model/message_model";
import { User, UserModel } from "../model/user_model";

async function saveMessageDB(
  id: string,
  recieverUsername: string,
  messageText: string,
  isIdUsername?: Boolean
) {
  try {
    let user;
    if (isIdUsername) {
      user = await UserModel.findOne({ username: id });
    } else {
      user = await UserModel.findById(id);
    }
    let reciever = await UserModel.findOne({ username: recieverUsername });
    if (user && reciever) {
      let message = new MessageModel({
        senderId: user.username,
        receiverId: recieverUsername,
        msgText: messageText,
      });
      console.log(message);

      await message.save();
      console.log("messege saved");
    }
  } catch (error) {
    console.log(error);

    throw new DataBaseException();
  }
}
async function deleteAllMessagesDB(id: string) {
  try {
    let user = await UserModel.findById(id);
    if (user) {
      let messages = await MessageModel.find({ senderId: user.username });
      for (let message of messages) {
        await MessageModel.findByIdAndDelete(message._id);
      }
    }
  } catch (error) {
    console.log(error);
    throw new DataBaseException();
  }
}
async function getAllUnredMessagesDB(id: string): Promise<never[]> {
  try {
    let user = await UserModel.findById(id);
    if (user) {
      return await MessageModel.find({
        receiverId: user.username,
        isRead: false,
      });
    }
    throw new DataBaseException();
  } catch (error) {
    console.log(error);
    throw new DataBaseException();
  }
}
async function registerUserDB(
  email: string,
  username: string,
  password: string,
  apptoken: string
): Promise<User> {
  let user = new UserModel({
    username: username,
    email: email,
    password: password,
    isOnline: false,
    appToken: apptoken,
  });
  try {
    user.save();
    return user;
  } catch (error) {
    console.log(error);
    throw new DataBaseException();
  }
}

async function markMessagesReaded(messages: Message[]) {
  try {
    for (let message of messages) {
      message.isRead = true;
      await message.save();
    }
  } catch (error) {
    console.log(error);
  }
}
export {
  registerUserDB,
  deleteAllMessagesDB as deleteMessagesDB,
  saveMessageDB,
  getAllUnredMessagesDB,
  markMessagesReaded,
};
