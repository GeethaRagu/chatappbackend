import Conversation from "../Models/conversationModel.js";
import Message from "../Models/messageModel.js";

export const sendMesssage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    //console.log(message);
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
   
    if (!conversation) {
     conversation =  await Conversation.create({
        participants: [senderId, receiverId],
        
      });
    }
   
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
   // console.log(newMessage);
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    //await newMessage.save();
    //await conversation.save();

    await Promise.all([newMessage.save(), conversation.save()]);

    res.status(200).json(newMessage);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "Internal server error in sendMessage Controller" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: UserToChatId } = req.params;
    const senderId = req.user._id; // get the id from protectRoute middleware

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, UserToChatId] },
    }).populate("messages");
    //console.log(conversation);
    if (!conversation || conversation === null) {
      res.status(200).json([]);
    }
    if (conversation) res.status(200).json(conversation.messages);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "Internal server error in getMessage Controller" });
  }
};
