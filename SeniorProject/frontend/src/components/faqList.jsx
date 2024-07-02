import AOS from "aos";
import "aos/dist/aos.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect } from "react";
import { faqsList } from "../assets/data/faqs";
import FaqsCard from "./faq";
const FaqList = () => {
  useEffect(() => {
    AOS.init({
      easing: "ease-in-out",
      delay: 100,
      once: true,
    });
  }, []);
  useEffect(() => {
    gsap.utils.toArray(".gs_reveal").forEach((elem) => {
      hide(elem); // Hide the element initially

      ScrollTrigger.create({
        trigger: elem,
        onEnter: () => animateFrom(elem),
        onEnterBack: () => animateFrom(elem, -1),
      });
    });
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
        duration: 2,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "expo",
        overwrite: "auto",
        once: true,
      }
    );
  };

  const hide = (elem) => {
    gsap.set(elem, { autoAlpha: 0 });
  };

  return (
    <section className=" p-3 lg:p-5 rounded-[12px] max-w-screen-xl mt-12 mx-auto px-4 md:px-8 gs_reveal gs_reveal_fromRight">
      <div className=" space-y-[-30px] text-center">
        <h2 className="text-[44px] pr-14 leading-[50px] p-4 lg:mx-[-20px] sm:text-[40px]   mt-7 sm:mr-[-30px]    md:mr-[-407px]  text-black font-[700]">
          Most questions by
        </h2>
        <h2 className="text-[44px]  leading-[50px] p-4 lg:mx-[-20px] sm:text-[40px]   mt-7 sm:mr-[-30px]    md:mr-[-407px]  text-black font-[700]">
          <span class="text-bluehavy m ">our beloved patients</span>
        </h2>
      </div>
      <div className=" faq mt-0 max-w-2xl mx-auto">
        {faqsList.map((item, idx) => (
          <FaqsCard idx={idx} faqsList={item} />
        ))}
      </div>
    </section>
  );
};
export default FaqList;
