import express from "express";
import {
  bookeAppointmnetController,
  bookingAvailabilityController,
  getCheckoutSession,
} from "../Controllers/bookingController.js";
import { authenticate } from "./../auth/verifyToken.js";
const router = express.Router();
router.post("/checkout-session/:doctorId", authenticate, getCheckoutSession);
router.post(
  "/booking-availability/:doctorId",
  authenticate,
  bookingAvailabilityController
);
router.post(
  "/book-appointment/:doctorId",
  authenticate,
  bookeAppointmnetController
);

export default router;
