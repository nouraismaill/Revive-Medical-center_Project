import {
  Button,
  IconButton,
  MobileNav,
  Navbar,
} from "@material-tailwind/react";
import { Avatar } from "antd";
import React, { useContext, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import "../App.css";
import logo from "../assets/images/logo1.png";
const StickyNavbar = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-0 mb-3 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-blue-800">
      <li className="p-1 font-normal">
        <NavLink to="/" className="flex items-center" activeClassName="active">
          HOME
        </NavLink>
      </li>
      <li className="p-1 font-normal">
        <NavLink
          to="/services"
          className="flex items-center"
          activeClassName="active"
        >
          SERVICES
        </NavLink>
      </li>
      <li className="p-1 font-normal">
        <NavLink
          to="/doctors"
          className="flex items-center"
          activeClassName="active"
        >
          FIND A DOCTOR
        </NavLink>
      </li>
      <li className="p-1 font-normal">
        <NavLink
          to="/contact"
          className="flex items-center"
          activeClassName="active"
        >
          CONTACT
        </NavLink>
      </li>
    </ul>
  );
  return (
    <Navbar className="nav h-max max-w-full bg-white  rounded-none px-4 py-2 lg:px-9 lg:py-0">
      <div className="flex items-center justify-between my-[-20px] text-blue-gray-900">
        <Link to="/">
          <img src={logo} alt="" className="pt-2" width={127} />
        </Link>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          {token && user ? (
            <div>
              <Link
                to={`${
                  role === "doctor"
                    ? "/doctors/profile/me"
                    : "/users/profile/me"
                }`}
              >
                <Avatar
                  size={45}
                  shape="circle"
                  src={<img src={user?.photo} alt="avatar" />}
                />
              </Link>
            </div>
          ) : (
            <button className="Btn hidden lg:inline-block">
              <div class="sign">
                <svg viewBox="0 0 512 512">
                  <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path>
                </svg>
              </div>

              <Link to="/login">
                <div class="text">Login</div>
              </Link>
            </button>
          )}

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1  ">
          <Button fullWidth variant="text">
            <Link to="/login">
              <span>Log In</span>
            </Link>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
};

export default StickyNavbar;
