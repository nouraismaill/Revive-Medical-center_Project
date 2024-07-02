import CountUp, { useCountUp } from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { useState } from "react";
const Stats = () => {
  const [counterState, setCounterstate] = useState(false);
  const stats = [
    {
      data: "1500",
      title: "Happy Patients",
    },
    {
      data: "50",
      title: "Expert Doctors",
    },
    {
      data: "300",
      title: "Saved Hearts",
    },
    {
      data: "10",
      title: "Years of Experience",
    },
  ];
  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-white md:px-8">
        <ScrollTrigger
          onEnter={() => setCounterstate(true)}
          onExit={() => setCounterstate(false)}
        >
          {" "}
          <div
            className="my-9  "
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-bottom"
          >
            <ul className="flex flex-col items-center justify-center gap-y-10 sm:flex-row sm:flex-wrap lg:divide-x">
              {stats.map((item, idx) => (
                <li key={idx} className="text-center px-12 md:px-16">
                  <h4 className="text-5xl  leading-[56px] text-white font-bold">
                    +
                    {counterState && (
                      <CountUp
                        start={0}
                        end={item.data}
                        duration={1.9}
                      ></CountUp>
                    )}
                  </h4>
                  <p className="mt-3  font-semibold">{item.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </ScrollTrigger>
      </div>
    </section>
  );
};

export default Stats;
