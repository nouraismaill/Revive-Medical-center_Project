import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "https://revive-backend-j4x9.onrender.com/api/v1/message/send",
          { name, email, phone, message },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: "ease-in-out",
      delay: 100,
      once: true,
    });
  }, []);
  return (
    <section>
      <div class="slider-area2 ">
        <div class="slider-height2 d-flex align-items-center">
          <div class="container">
            <div class="row ">
              <div class="col-xl-12  lg:mx-80 md:mx-40   md:flex-none lg:flex-none space-y-6   sm:max-w-lg md:max-w-md lg:max-w-xl">
                <div class="hero-cap hero-cap2 text-center">
                  <h2>Contact Us</h2>
                  <p className="breadcrumb-paragraph  ">
                    We Are Ready To Assist You In 24x7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="relatiInformation flex items-top justify-center min-h-screen bg-white dark:bg-gray-900 sm:items-center sm:pt-0 mt-6">
        <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div class="mt-8 oInformationrflow-hidden">
            <div class="grid grid-cols-1 md:grid-cols-2">
              <div
                class="p-6 mr-2 bg-[#FFFFFF] dark:bg-gray-800 sm:rounded-lg"
                data-aos="fade-right"
              >
                <h1 class="text-4xl sm:text-5xl text-black dark:text-white font-extrabold tracking-tight">
                  Get in touch
                </h1>
                <p class="text-2xl  text-gray-700 dark:text-gray-400 mt-2">
                  Fill in the form to Send a Message
                </p>

                <div class="flex items-center mt-8 text-gray-600 dark:text-gray-400"></div>
                <div className="leading-9 ">
                  <div className="flex items-center mt-2 ">
                    <span class="inline-block  p-5  text-blue-500  bg-blue-500 rounded-3xl  dark:text-white dark:bg-blue-500">
                      <img
                        src="https://uploads-ssl.webflow.com/6377548db7a796209f44fc12/638dbf8dac558a051780664e_phone-call.svg"
                        loading="lazy"
                        alt="call-img"
                        width="33"
                      />
                    </span>
                    <div class="contact-info">
                      <h3 className="ml-6 tracking-wide text-[20px] font-bold w-40">
                        Call us
                      </h3>
                      <a
                        href="tel:+227-300-3676"
                        className="ml-6 text-md tracking-wide font-semibold w-40  text-gray-600 dark:text-gray-400"
                      >
                        +227-300-3676
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center mt-12 ">
                    <span class="inline-block  py-6 px-5  text-blue-500  bg-blue-500 rounded-3xl  dark:text-white dark:bg-blue-500">
                      <img
                        src="	https://uploads-ssl.webflow.com/6377548db7a796209f44fc12/63996292dbae1bb25aeba0f5_email.svg"
                        loading="lazy"
                        alt="email-img"
                        width="33"
                      />
                    </span>
                    <div class="contact-info">
                      <h3 className="ml-6 tracking-wide text-[20px] font-bold w-40">
                        Mail us 24/7
                      </h3>
                      <a
                        href="mailto:RMC@gmail.com?subject=%23"
                        class="text-md tracking-wide font-semibold w-40 text-gray-600 dark:text-gray-400 ml-6"
                      >
                        RMC@gmail.com
                      </a>
                    </div>
                  </div>
                  <div class="flex items-center mt-1">
                    <span class="inline-block  py-4 px-6  text-blue-500  bg-blue-500  rounded-3xl dark:text-white dark:bg-blue-500">
                      <img
                        src="https://uploads-ssl.webflow.com/6377548db7a796209f44fc12/638dbd7cbf262e5ba631d32a_location.svg"
                        loading="lazy"
                        alt="address-img"
                        width="27"
                      />
                    </span>
                    <div class="contact-info ml-4 ">
                      <h3 class="tracking-wide text-[20px] font-bold w-40  mt-8 ">
                        Our Location
                      </h3>
                      <p class="  leading-7 text-md tracking-wide font-semibold w-40 text-gray-600 dark:text-gray-400 hover:text-blue-500  ">
                        NO.09A, DOWNTOWN, SAN DIEAGO, USA
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleMessage}
                class="p-6 flex flex-col justify-center bg-[#F4F6F9] "
                data-aos="fade-left"
              >
                <div class="flex flex-col">
                  <label for="name" class="hidden text-gray-800">
                    Full Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    value={name}
                    placeholder="Full Name"
                    class="input-style mt-2 py-3 px-3"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div class="flex flex-col mt-2">
                  <label for="email" class="hidden">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    class=" input-style mt-2 py-3 px-3 "
                  />
                </div>

                <div class="flex flex-col mt-2">
                  <input
                    className="input-style mt-2 py-3 px-3 "
                    maxlength="256"
                    name="Phone-Number"
                    data-name="Phone Number"
                    placeholder="Phone Number"
                    type="number"
                    id="Phone-Number"
                    fdprocessedid="o2r8tc"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  ></input>
                </div>
                <div class="flex flex-col mt-2">
                  <label for="Information" class="hidden  ">
                    Additional Information
                  </label>
                  <textarea
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    class="input-style mt-2 py-3 px-3   "
                  ></textarea>
                </div>

                <button
                  type="submit"
                  class="md:w-26 bg-[#2196F3] text-white font-bold py-3 px-4 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
