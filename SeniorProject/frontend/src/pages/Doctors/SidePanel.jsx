import { DatePicker, TimePicker, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL, token } from "../../config";
import { hideLoading, showLoading } from "../../redux/alertSlice";

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  const dispatch = useDispatch();
  let params = useParams();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false); // State to track availability check
  const [isLoading, setIsLoading] = useState(false); // State to track loading state

  const convertTo12HourFormat = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hoursIn12HourFormat = hours % 12 || 12;
    return `${hoursIn12HourFormat}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  };

  const bookingHandler = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const userId = userData._id;

      if (!date || !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        `${BASE_URL}/bookings/checkout-session/${doctorId}`,
        {
          doctorId,
          userId,
          date: date,
          time: time,
          ticketPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.data) {
        throw new Error("Empty response received");
      }

      if (!res.data.session) {
        throw new Error("No session data received");
      }

      if (res.data.session.url) {
        window.location.href = res.data.session.url;
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  const handleAvailability = async () => {
    try {
      setIsLoading(true);
      dispatch(showLoading());
      const res = await axios.post(
        `$https://revive-backend-j4x9.onrender.com/bookings/booking-availability/${doctorId}`,
        { doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(hideLoading());
      setIsLoading(false);

      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message); // Display the success message
      } else {
        setIsAvailable(false);
        message.error(res.data.message); // Display the error message
      }
    } catch (error) {
      setIsLoading(false);
      dispatch(hideLoading());
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(error.response.data.message); // Display the specific error message from the server response
      } else {
        message.error("Error occurred. Please try again later."); // Display a generic error message
      }
    }
  };

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 lg:text-[16px] font-semibold sm:text-sm">
          Ticket Price
        </p>
        <span className="leading-7 lg:text-[22px] lg:leading-8 text-black font-bold">
          {ticketPrice} USD
        </span>
      </div>
      <div className="mt-[30px]">
        <p className="lg:text-[16px] text__para mt-0 font-semibold text-black sm:text-sm">
          Available Time Slots:
        </p>
        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="lg:text-[15px] leading-6 text-gray-700 font-semibold sm:text-sm">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className="lg:text-[16px] leading-6 text-gray-700 font-semibold sm:text-[10px]">
                {convertTo12HourFormat(item.startingTime)} -{" "}
                {convertTo12HourFormat(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
        <DatePicker
          aria-required={"true"}
          className="m-2"
          format="DD-MM-YYYY"
          onChange={(value) => {
            setDate(value.format("DD-MM-YYYY")); // Set formatted date value
          }}
        />
        <TimePicker
          aria-required={"true"}
          className="mt-3 m-2"
          format="HH:mm"
          use12Hours={true}
          activeBg="#1677ff"
          onChange={(value) => {
            setTime(value.format("HH:mm")); // Set formatted time value
          }}
        />
        <button
          className="lg:text-[16px] w-full cursor-pointer h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all group active:duration-300 ease-in-out sm:text-sm mb-5"
          onClick={handleAvailability}
          disabled={isLoading}
        >
          Check Availability
        </button>
      </div>
      <button
        onClick={bookingHandler}
        disabled={!isAvailable}
        className="lg:text-[16px] w-full cursor-pointer h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all group active:duration-300 ease-in-out sm:text-sm"
      >
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
