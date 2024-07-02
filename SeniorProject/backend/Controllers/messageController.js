import Message from "../models/MessageSchema.js";
export const sendMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Please Fill Full Form!" });
    }
    await Message.create({ name, email, phone, message });
    res.status(200).json({
      success: true,
      message: " Your Message Sent!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};
