import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Star from "../assets/images/Star.png";
import Error from "../components/Error";
import Loader from "../components/Loading";
import { BASE_URL } from "../config";
import useFetchData from "../hooks/useFetchData";

const doctors = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: "ease-in-out",
      delay: 100,
      once: true,
    });
  }, []);
  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);
  const sortedDoctors = doctors
    .slice()
    .sort((a, b) => a.yearsOfExperience - b.yearsOfExperience);

  const doctorsToShow = sortedDoctors.slice(0, 3);
  return (
    <>
      {loading && <Loader />}
      {error && <Error />}
      {!loading && !error && (
        <section className="py-14  ">
          <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="max-w-xl mx-auto sm:text-center">
              <h3
                data-aos="zoom-in"
                className=" text-3xl font-bold text-center text-black capitalize lg:text-5xl dark:text-white"
              >
                Our Experience <span class="text-bluehavy">Doctors</span>
              </h3>
            </div>
            <div className="mt-5 mb-[-100px]">
              <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 ">
                {doctorsToShow.map((doctor, idx) => (
                  <li
                    key={doctor._id}
                    className="transition duration-300 ease-in-out hover:scale-110"
                    data-aos="zoom-in"
                  >
                    <Link to={`/doctors/${doctor._id}`}>
                      <img
                        src={doctor.photo}
                        className=" object-cover rounded-xl aspect-square  "
                        alt=""
                      />
                    </Link>
                    <h2 className="text-[18px] leading-[30px] lg:text-[26px]  lg:leading-9 text-black font-[700]">
                      {doctor.name}
                    </h2>
                    <div className="mt-2 lg:mt-4 flex items-center justify-between">
                      <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2  lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                        {doctor.specialization}
                      </span>
                      <div className="flex items-center gap-[6px]">
                        <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-black ">
                          <img src={Star} alt="" />
                          {doctor.avgRating}
                        </span>

                        <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-gray-500">
                          ({doctor.totalRating})
                        </span>
                      </div>
                    </div>
                    <div className="mt-[18px] lg:mt-5  flex items-center justify-between"></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default doctors;
