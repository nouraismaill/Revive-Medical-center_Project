import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { authContext } from "../../../context/AuthContext";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { BASE_URL, token } from "../../config";
import useGetProfile from "../../hooks/useFetchData";
import MyBookings from "./MyBookings";
import Profile from "./Profile";

export default function MyAccount() {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("bookings");

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`https://revive-backend-j4x9.onrender.com/users/profile/me`);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch(`https://revive-backend-j4x9.onrender.com/users/${userData._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }
      toast.success(message);
      handleLogout();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-[1170px] px-4 mx-auto">
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}
      {!loading && !error && (
        <div className="pt-10 grid md:grid-cols-3 gap-10">
          <div className="pb-8 md:pb-8 md:px-0">
            <div className="flex items-center justify-center mb-4">
              <figure className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-solid border-primaryColor">
                <img
                  src={userData.photo}
                  alt=""
                  className="w-full h-full rounded-full"
                />
              </figure>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold leading-7 text-headingColor">
                {userData.name}
              </h3>
              <p className="text-sm leading-6 text-textColor">
                {userData.email}
              </p>
              <p className="text-sm leading-6 text-textColor">
                Blood Type:
                <span className="ml-2 text-headingColor">
                  {userData.bloodType}
                </span>
              </p>
            </div>
            <div className="mt-8 md:mt-12 space-y-4">
              <button
                onClick={handleLogout}
                className="w-full bg-blue-600 py-3 text-base leading-7 rounded-md text-white"
              >
                Logout
              </button>
              <button
                className="w-full bg-red-600 py-3 text-base leading-7 rounded-md text-white"
                onClick={handleDeleteAccount}
              >
                Delete account
              </button>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="mb-4 flex justify-center space-x-4">
              <button
                onClick={() => setTab("bookings")}
                className={`${
                  tab === "bookings"
                    ? "bg-[#64EBB6]  text-blue-600"
                    : "bg-blue-600 text-white"
                } py-2 px-5 rounded-md text-sm leading-7 font-semibold border border-solid border-blue-600`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setTab("settings")}
                className={`${
                  tab === "settings"
                    ? "bg-[#64EBB6] text-blue-600"
                    : "bg-blue-600 text-white"
                } py-2 px-5 rounded-md text-sm leading-7 font-semibold border border-solid border-blue-600`}
              >
                Profile Settings
              </button>
            </div>
            {tab === "bookings" && <MyBookings />}
            {tab === "settings" && <Profile user={userData} />}
          </div>
        </div>
      )}
    </div>
  );
}
