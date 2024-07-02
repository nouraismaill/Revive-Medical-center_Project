import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";

const Servicess = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: "ease-in-out",
      delay: 100,
      once: true,
    });
  }, []);

  return (
    <section class="bg-white dark:bg-gray-900 ">
      <div class="container px-6 py-14 mx-auto">
        <h1
          class="  text-3xl font-bold text-center text-black capitalize lg:text-5xl dark:text-white"
          data-aos="fade-down"
          data-aos-duration="2000"
        >
          Explore our <span class="text-bluehavy">Services</span>
        </h1>

        <div
          class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-3 xl:grid-cols-3"
          data-aos="zoom-in-up"
          data-aos-duration="2000"
        >
          <div class=" flex flex-col items-center p-6 space-y-3 text-center bg-babyblue rounded-xl dark:bg-gray-800">
            <span class="inline-block  p-5  text-blue-500  bg-blue-500 rounded-full  dark:text-white dark:bg-blue-500">
              <img
                src="https://assets-global.website-files.com/65bb1ade509e90321a2f3fb7/65bb1ade509e90321a2f40e1_medical-service-one.svg"
                loading="lazy"
                alt="Service Icon"
                class="service-icon-image"
              />
            </span>

            <h1 class="text-xl font-bold text-black capitalize dark:text-white">
              Cardiologist
            </h1>

            <p class=" text-black dark:text-gray-300">
              Objectively integrate enterprise-wide strategic theme areas with
              functionalized infrastructures.
            </p>
          </div>

          <div class=" flex flex-col items-center p-6 space-y-3 text-center bg-babyblue rounded-xl dark:bg-gray-800">
            <span class="inline-block p-5 text-blue-500 bg-blue-500 rounded-full dark:text-white dark:bg-blue-500">
              <img
                src="https://assets-global.website-files.com/65bb1ade509e90321a2f3fb7/65bb1ade509e90321a2f40df_medical-service-two.svg"
                loading="lazy"
                alt="Service Icon"
                class="service-icon-image "
              />
            </span>

            <h1 class="text-xl font-bold  text-black capitalize dark:text-white">
              Pulmonary
            </h1>

            <p class=" text-black dark:text-gray-300">
              Interactively productize premium technologies where interdependent
              quality vectors available.
            </p>
          </div>

          <div class="flex flex-col items-center p-6 space-y-3 text-center  bg-babyblue rounded-xl dark:bg-gray-800">
            <span class="inline-block p-5 text-blue-500 bg-blue-500  rounded-full dark:text-white dark:bg-blue-500">
              <img
                src="https://assets-global.website-files.com/65bb1ade509e90321a2f3fb7/65bb1ade509e90321a2f40dd_medical-service-five.svg"
                loading="lazy"
                alt="Service Icon"
                class="service-icon-image"
              />
            </span>

            <h1 class="text-xl font-bold text-black capitalize dark:text-white">
              Neurology
            </h1>

            <p class="text-black dark:text-gray-300">
              Quickly communicate enabled technology and turnkey leadership
              skills for the doctor.
            </p>
          </div>
        </div>
      </div>
      <div className=" centered-container ">
        <a href="/services">
          <button className="allservices bg-[#28AADC] text-white" type="button">
            VIEW ALL SERVICES
          </button>
        </a>
      </div>
    </section>
  );
};

export default Servicess;
