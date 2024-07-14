import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";
import { authContext } from "../../context/AuthContext.jsx";
import { BASE_URL } from "../config";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      });

      setLoading(false);
      toast.success(result.message);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center pb-20 justify-center  h-screen light">
      <form className="form" onSubmit={submitHandler}>
        <div className="header">Log in</div>
        <div className="inputs">
          <input
            placeholder="Enter your Email"
            className="input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            placeholder="Password"
            className="input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <button className="sigin-btn py-5" style={{ position: "relative" }}>
            {loading && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <HashLoader size={25} color="#fff" />
              </div>
            )}
            <span style={{ visibility: loading ? "hidden" : "visible" }}>
              Login
            </span>
          </button>

          <div className="mt-7"></div>
          <p className="signup-link">
            Don't have an account? <a href="${BASE_URL}/auth/register">Sign up</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
