import AOS from "aos";
import "aos/dist/aos.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
const Services = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: "ease-in-out",
      delay: 100,
    });
  }, []);
  const boxesRef = useRef([]);
  useEffect(() => {
    gsap.utils.toArray(".gs_reveal").forEach((elem) => {
      hide(elem); // Hide the element initially

      ScrollTrigger.create({
        trigger: elem,
        onEnter: () => animateFrom(elem),
        onEnterBack: () => animateFrom(elem, -1),
        onLeave: () => hide(elem),
      });
    });
    gsap.defaults({ ease: "power3" }); // Set default ease to power3

    gsap.set(".box", { y: 100 }); // Initial position for the animation

    // Set up ScrollTrigger batch animation
    ScrollTrigger.batch(boxesRef.current, {
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: { each: 0.15, grid: [1, 3] },
          overwrite: true,
        }),
      onLeave: (batch) =>
        gsap.set(batch, { opacity: 0, y: -100, overwrite: true }),
      onEnterBack: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
      onLeaveBack: (batch) =>
        gsap.set(batch, { opacity: 0, y: 100, overwrite: true }),
    });

    // Add refreshInit listener to reset y position temporarily during refresh
    const refreshInitListener = () => gsap.set(".box", { y: 0 });
    ScrollTrigger.addEventListener("refreshInit", refreshInitListener);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      ScrollTrigger.removeEventListener("refreshInit", refreshInitListener);
    };
  }, []);

  const animateFrom = (elem, direction = 1) => {
    let x = 0;
    let y = direction * 100;

    if (elem.classList.contains("gs_reveal_fromLeft")) {
      x = -100;
      y = 0;
    } else if (elem.classList.contains("gs_reveal_fromRight")) {
      x = 100;
      y = 0;
    }

    gsap.fromTo(
      elem,
      { x: x, y: y, autoAlpha: 0 },
      {
        duration: 1.5,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "expo",
        overwrite: "auto",
      }
    );
  };

  const hide = (elem) => {
    gsap.set(elem, { autoAlpha: 0 });
  };

  return (
    <section>
      <div class="slider-area2 ">
        <div class="slider-height2  align-items-center">
          <div class="container">
            <div class="row ">
              <div class="col-xl-12  lg:mx-80 md:mx-40  lg:flex-none     lg:max-w-xl">
                <div class="hero-cap hero-cap2 text-center md:px-8 md:text-[17px]">
                  <h2 className="md:text-[13px]">Our Services</h2>
                  <p className="breadcrumb-paragraph  ">
                    Experienced Doctors Across All Specialties
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="  grid grid-cols-1 mx-6 pb-7 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-3 xl:grid-cols-3"
        data-aos="zoom-in"
      >
        <div class="flex flex-col items-center p-6 space-y-3 text-center bg-babyblue rounded-xl dark:bg-gray-800">
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
            Quickly communicate enabled technology and turnkey leadership skills
            for the doctor.
          </p>
        </div>
        <div class="flex flex-col items-center p-6 space-y-3 text-center  bg-babyblue rounded-xl dark:bg-gray-800">
          <span class="inline-block p-5 text-blue-500 bg-blue-500  rounded-full dark:text-white dark:bg-blue-500">
            <img
              src="https://assets-global.website-files.com/65bb1ade509e90321a2f3fb7/65bb1ade509e90321a2f40e0_medical-service-four.svg"
              loading="lazy"
              alt="Service Icon"
              class="service-icon-image"
            />
          </span>

          <h1 class="text-xl font-bold text-black capitalize dark:text-white">
            Urology
          </h1>

          <p class="text-black dark:text-gray-300">
            Uniquely matrix economically sound value through the cooperative
            technology competently.
          </p>
        </div>
        <div class="flex flex-col items-center p-6 space-y-3 text-center  bg-babyblue rounded-xl dark:bg-gray-800">
          <span class="inline-block p-5 text-blue-500 bg-blue-500  rounded-full dark:text-white dark:bg-blue-500">
            <img
              src="https://assets-global.website-files.com/65bb1ade509e90321a2f3fb7/65bb1ade509e90321a2f40e2_medical-service-three.svg"
              loading="lazy"
              alt="Service Icon"
              class="service-icon-image"
            />
          </span>

          <h1 class="text-xl font-bold text-black capitalize dark:text-white">
            Radiology
          </h1>

          <p class="text-black dark:text-gray-300">
            The point of using Lorem Ipsum that it has a more-or-less
            distribution of look like readable English.
          </p>
        </div>
        <div class="flex flex-col items-center p-6 space-y-3 text-center  bg-babyblue rounded-xl dark:bg-gray-800">
          <span class="inline-block p-5 text-blue-500 bg-blue-500  rounded-full dark:text-white dark:bg-blue-500">
            <img
              src="https://assets-global.website-files.com/65bb1ade509e90321a2f3fb7/65bb1ade509e90321a2f40de_medical-service-six.svg"
              loading="lazy"
              alt="Service Icon"
              class="service-icon-image"
            />
          </span>

          <h1 class="text-xl font-bold text-black capitalize dark:text-white">
            Hypnotherapy
          </h1>

          <p class="text-black dark:text-gray-300">
            services and helps to complete and file the necessary paperwork with
            county and state offices.
          </p>
        </div>
      </div>
    </section>
  );
};
export default Services;
