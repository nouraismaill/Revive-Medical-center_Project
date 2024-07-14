import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Star from "../../assets/images/Star.png";
import Error from "../../components/Error";
import Loader from "../../components/Loading";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";

const Doctors = () => {
  const [query, setQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const handleSearch = () => {
    setDebouncedQuery(query.trim());
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 700);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);
  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: "ease-in-out",
      delay: 100,
      once: true,
    });
  }, []);

  const { data: doctors, loading, error } = useFetchData(`https://revive-backend-j4x9.onrender.com/doctors`);

  useEffect(() => {
    if (doctors) {
      const filtered = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setFilteredDoctors(filtered);
    }
  }, [doctors, debouncedQuery]);

  return (
    <>
      <section>
        <div className="slider-area2 p-10">
          <div className="slider-height2 d-flex align-items-center">
            <div className="col-xl-12 lg:mx-80 md:mx-40 lg:flex-none lg:max-w-xl">
              <div className="hero-cap leading-2 hero-cap2 text-center">
                <h2>Find A Doctor</h2>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="rounded-lg p-5">
              <div className="flex">
                <input
                  type="search"
                  className="w-full pr-2 py-4 max-w-[570px] bg-white pl-4 text-base text-black font-semibold focus:outline-none"
                  placeholder="Search a Doctor"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  onClick={handleSearch}
                  className="bg-[#300285] p-3 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          {loading && <Loader />}
          {error && <Error />}

          <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="mt-12">
              {!loading && !error && (
                <ul className="grid gap-8 sm:grid-cols-3 md:grid-cols-3 ">
                  {filteredDoctors.map((doctor, idx) => (
                    <li key={doctor._id} data-aos="zoom-in">
                      <Link to={`/doctors/${doctor._id}`}>
                        {/* Doctor profile */}
                        <img
                          src={doctor.photo}
                          className="object-cover rounded-xl aspect-square"
                          alt=""
                        />
                      </Link>
                      <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-black font-[700]">
                        {doctor.name}
                      </h2>
                      <div className="mt-2 lg:mt-4 flex items-center justify-between">
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
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
                      <div className="mt-[18px] lg:mt-5 flex items-center justify-between"></div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Doctors;
