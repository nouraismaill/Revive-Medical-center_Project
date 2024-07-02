import bcrypt from "bcrypt";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, password, photo, gender, bloodType } = req.body;

  try {
    // Hash the new password if it's provided
    let hashedPassword;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    // Prepare updated user data
    const updatedUserData = {
      name,
      email,
      photo,
      gender,
      bloodType,
    };

    // If a new password was provided, add it to the updated user data
    if (hashedPassword) {
      updatedUserData.password = hashedPassword;
    }

    // Update the user in the database
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedUserData },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully Updated",
      data: updateUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Successfully deleted " });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete " });
  }
};
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const userr = await User.findById(id).select("-password");
    res
      .status(200)
      .json({ success: true, message: "User found ", data: userr });
  } catch (error) {
    res.status(404).json({ success: false, message: "No user found " });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res
      .status(200)
      .json({ success: true, message: "Users found ", data: users });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not found " });
  }
};
export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "Profile info is being received",
      data: { ...rest },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, cannot get the info",
    });
  }
};
export const getMyAppointments = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId });
    const doctorIds = bookings.map((el) => el.doctor.id);

    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message: "Appointments are getting",
      data: doctors,
    });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};
