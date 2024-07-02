import moment from "moment";
import Stripe from "stripe";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const getCheckoutSession = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Check the request body
    console.log("Doctor ID:", req.params.doctorId); // Check the doctor ID
    console.log("User ID:", req.userId);
    const doctor = await Doctor.findById(req.params.doctorId);
    console.log("Doctor:", doctor);
    const user = await User.findById(req.userId);
    console.log("User:", user);
    const date = req.body.date;
    console.log("Parsed Date:", date);
    const time = req.body.time;
    console.log("Parsed Time:", time);
    const description = doctor.bio || "No description available"; // Use a default description if doctor.bio is empty
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/doctors/${doctor.id}`,
      customer_email: user.email,
      client_reference_id: req.params.doctorId,
      line_items: [
        {
          price_data: {
            currency: "USD",
            unit_amount: doctor.ticketPrice * 100,
            product_data: {
              name: doctor.name,
              description: description,
              images: [doctor.photo],
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        date: req.body.date,
        time: req.body.time,
      },
    });
    if (!doctor || !user || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data.",
      });
    }

    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      date: date,
      time: time,
      ticketPrice: doctor.ticketPrice,
    });
    await booking.save();
    res
      .status(200)
      .json({ success: true, message: "Successfully Paid", session });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error creating checkout session" });
  }
};
export const bookingAvailabilityController = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    const user = await User.findById(req.userId);
    const date = moment(req.body.date, "DD-MM-YYYY").format("DD-MM-YYYY");
    const time = moment(req.body.time, "HH:mm").format("HH:mm");
    const dayOfWeek = moment(req.body.date, "DD-MM-YYYY")
      .format("dddd")
      .toLowerCase();

    const timeSlot = doctor.timeSlots.find(
      (slot) => slot.day.toLowerCase() === dayOfWeek
    );

    if (!timeSlot) {
      return res.status(404).send({
        success: false,
        message: "The doctor is not available on this day.",
      });
    }

    const selectedDateTime = moment(
      `${req.body.date} ${req.body.time}`,
      "DD-MM-YYYY HH:mm"
    );

    const startingTime = moment(
      `${req.body.date} ${timeSlot.startingTime}`,
      "DD-MM-YYYY HH:mm"
    );
    const endingTime = moment(
      `${req.body.date} ${timeSlot.endingTime}`,
      "DD-MM-YYYY HH:mm"
    );

    // Check if the selected time is within the doctor's working hours
    if (
      selectedDateTime.isSameOrAfter(startingTime) &&
      selectedDateTime.isBefore(endingTime)
    ) {
      const existingAppointment = await Booking.findOne({
        doctor: doctor._id,
        date: date,
        time: time,
      });

      if (existingAppointment) {
        return res.status(400).send({
          success: false,
          message: "Appointment not available at this time.",
        });
      } else {
        return res.status(200).send({
          success: true,
          message: "Appointment is available.",
        });
      }
    } else {
      return res.status(400).send({
        success: false,
        message: "The doctor is not available at this time.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in booking availability",
    });
  }
};

export const bookeAppointmnetController = async (req, res) => {
  try {
    const doctor = req.params.doctorId;
    const user = await User.findById(req.userId);
    // Ensure date and time are correctly parsed from the request body
    const date = moment(req.body.date, "DD-MM-YYYY").startOf("day").toDate();
    const time = moment(req.body.time, "HH:mm").format("HH:mm");
    const timeSlot = doctor.timeSlots.find(
      (slot) => slot.day.toLowerCase() === date.format("dddd").toLowerCase()
    );

    // Check if the doctor is available on the selected day
    if (!timeSlot) {
      return res.status(404).send({
        success: false,
        message: "The doctor is not available on this day.",
      });
    }
    const existingBooking = await Booking.findOne({
      doctor: doctor._id,
      date: date,
      time: time,
    });

    if (existingBooking) {
      console.log("Conflicting appointment found:", existingBooking);
      return res.status(400).send({
        success: false,
        message: "Another appointment is already booked at this time.",
      });
    }

    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      date: date,
      time: time,
      ticketPrice: doctor.ticketPrice,
    });

    await booking.save();

    res.status(200).send({
      success: true,
      message: "Appointment Booked successfully",
    });
  } catch (error) {
    console.error("Error while booking appointment:", error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error while booking appointment",
    });
  }
};
