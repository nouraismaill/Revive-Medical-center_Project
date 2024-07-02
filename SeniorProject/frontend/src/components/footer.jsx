import React from "react";
import logo2 from "../assets/images/logo2.png";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer class="bg-darkblue pt-9">
      <div class="container flex flex-col items-center  justify-between px-6 py-8 mx-auto lg:flex-row">
        <a href="/">
          <img class="w-auto h-20" src={logo2} alt="" />
        </a>

        <div class=" flex flex-wrap items-center justify-center gap-4 mt-6 lg:gap-6 lg:mt-0">
          <a
            href="/"
            class="text-sm  text-white transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            HOME
          </a>

          <a
            href="/services"
            class="text-sm  text-white transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            SERVICES
          </a>

          <a
            href="/doctors"
            class="text-sm  text-white transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            FIND A DOCTOR
          </a>
          <a
            href="/contact"
            class="text-sm  text-white transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            CONTACT
          </a>
        </div>

        <p class="mt-6 text-sm  text-white lg:mt-0 dark:text-gray-400">
          © . {currentYear} <a href="/">Revive Medical Center</a>. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
