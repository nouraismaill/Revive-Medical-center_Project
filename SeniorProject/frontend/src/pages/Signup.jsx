import { Avatar } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";
import signupImg from "../assets/images/signup.gif";
import { BASE_URL } from "../config";
import uploadImageToCloudinary from "../utils/uploadCloudinary";
const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "male",
    role: "patient",
  });
  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: "ease-in-out",
      delay: 100,
      once: true,
    });
  }, []);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    // cloudinary to be used to upload image
    const data = await uploadImageToCloudinary(file);

    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }
      setLoading(false);
      toast.success(message);
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div
            className="hidden lg:block py-10 rounded-l-lg"
            data-aos="fade-right"
          >
            <figure className="rounded-l-lg">
              <img src={signupImg} alt="" className="w-full rounded-l-lg" />
            </figure>
          </div>
          <div
            className="flex flex-col items-center justify-center py-5"
            data-aos="fade-left"
          >
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">Sign Up</h2>
              <form className="flex flex-col" onSubmit={submitHandler}>
                <input
                  placeholder="Full Name"
                  value={formData.name}
                  name="name"
                  onChange={handleInputChange}
                  className="input-style  p-2 mb-4"
                  type="text"
                  required
                />
                <input
                  placeholder="Enter your email"
                  value={formData.email}
                  name="email"
                  onChange={handleInputChange}
                  className="input-style p-2 mb-4"
                  type="email"
                  required
                />
                <input
                  placeholder="Password"
                  value={formData.password}
                  name="password"
                  onChange={handleInputChange}
                  className="input-style p-2 mb-4"
                  type="password"
                  required
                />
                <label
                  className="text-sm mb-2 text-gray-900 font-bold cursor-pointer"
                  htmlFor="role"
                >
                  Are you a
                </label>
                <select
                  className="input-style p-2 mb-4"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="patient">patient</option>
                  <option value="doctor">doctor</option>
                </select>
                <label
                  className="text-sm mb-2 font-bold text-gray-900 cursor-pointer"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <select
                  className="input-style p-2 mb-4"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <div className="mb-5 pt-6 flex items-center gap-3">
                  {selectedFile && (
                    <Avatar
                      size={60}
                      shape="circle"
                      src={<img src={previewURL} alt="avatar" />}
                    />
                  )}
                  <div className="relative w-[130px] h-[50px]">
                    <input
                      type="file"
                      name="photo"
                      id="customFile"
                      accept=".jpg, .png"
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileInputChange}
                    />
                    <label
                      htmlFor="customFile"
                      className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#3B59BC] text-white font-semibold rounded-lg truncate cursor-pointer"
                    >
                      Upload Photo
                    </label>
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    disabled={loading && true}
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150 text-[18px] leading-[30px] "
                  >
                    {loading ? (
                      <HashLoader size={35} color="#ffffff" />
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
                <div className="mt-7"></div>
                <p className="text-gray-900 mt-4 text-center">
                  Already have an account?{" "}
                  <a
                    className="text-sm text-blue-500 -200 hover:underline mt-4"
                    href="/login"
                  >
                    Login
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
