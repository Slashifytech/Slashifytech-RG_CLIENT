import React, { useState } from "react";
import { mgLogo } from "../assets";
import { signin } from "../features/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../features/getUserSlice";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import Mobile from "../Components/MobileUI";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginCred, setLoginCred] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { value, name, type } = e.target;
    setLoginCred((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const res = await dispatch(
          signin({ email: loginCred?.email, password: loginCred?.password })
        );
        if (res?.payload?.token) {
          toast.success("Login Successful");

          dispatch(fetchUsers());

          if (res?.payload?.user?.roleType === "0") {
            navigate("/admin/dashboard");
          } else if (res?.payload?.user?.roleType === "2") {
            navigate("/agent/amcs-list");
          } else if (res?.payload?.user?.roleType === "1") {
            navigate("/admin/approval-lists");
          }
        } else {
          toast.error("Invalid credentials");
        }
      } catch (err) {
        console.error("Login error:", err);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <>
      <Mobile />
      <div className="bg-Image h-screen hidden sm:block md:block ">
        <div className="glass h-screen">
          <div className="text-white md:pt-12 sm:pt-16 pt-20 md:w-[40%] sm:w-[60%] flex flex-col justify-center   p-14  rounded-md ">
            <span className="flex flex-row items-center ">
              {/* <img src={mgLogo} alt="logo" className="w-28" /> */}
              <p className="text-white text-[30px] leading-9">
                {" "}
                <span className="font-bold text-[32px] flex flex-col">
                  RAAM
                </span>{" "}
                GROUP
              </p>
            </span>
            <div onKeyDown={handleKeyDown} className="mt-9">
              <p className="font-semibold  text-center italic text-[22px]">
                Welcome back to RG Portal
              </p>
              <div className="font-semibold  mt-6">
                Email <span className="text-red-500">*</span>
              </div>
              <input
                type="email"
                name="email"
                className="bg-white/20 backdrop-blur-md w-full mt-3 px-3 py-3 rounded-md outline-none border border-white/30 placeholder-white text-white"
                placeholder="Email"
                onChange={handleInput}
              />
              <div className="mt-6">
                <span className="font-semibold ">
                  Password <span className="text-red-500">*</span>
                </span>
                <div className="pt-3 pb-2 relative ">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="bg-white/20 backdrop-blur-md w-full px-3 py-3 rounded-md outline-none border border-white/30 placeholder-white text-white"
                    placeholder="Password"
                    onChange={handleInput}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 top-0 text-[20px] flex items-center "
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
              </div>
              <button
                onClick={handleLogin}
                className="bg-primary text-white  rounded-md py-3 mt-9 w-full"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
