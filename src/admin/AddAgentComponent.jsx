import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import InputField from "../Components/Input";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addAgent } from "../features/adminDashboardSlice";
import { fetchAllUserDataById } from "../../Util/UtilityFunction";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Header from "../Components/Header";

const AddAgentComponent = () => {
  const location = useLocation()
  const id = location?.state?.id;
  const addNew = location?.state?.addNew;
  const update = location?.state?.update;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isEmailValid, setEmailValid] = useState("");

  const [agentData, setAgentData] = useState({
    brandName: "MG",
    agentId: "",
    agentName: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    roleType: "2",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
const [aId, setAId] = useState();
  //********************* Password Hide & Unhide ***********************/

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    return passwordRegex.test(password);
  };

  //********************* Input Function***********************/

  const handleInput = (e) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    if (name === "brandName") {
      setAgentData((data) => ({
        ...data,
        brandName: value,
        roleType: value === "MG" ? "1" : value === "MB" ? "2" : "",
      }));
    } else {
      setAgentData((data) => ({
        ...data,
        [name]: value,
      }));
    }
  };

  //********************* Input Validation ***********************/
  const fieldLabels = {
    brandName: "Brand Name",
    agentId: "Agent ID",
    agentName: "Agent Name",
    email: "Email",
    contact: "Contact Number",
    password: "Password",
    confirmPassword: "Confirm Password",
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    const requiredFields = Object.keys(fieldLabels);
  
    // Check if required fields are filled
    requiredFields.forEach((field) => {
      if (!agentData[field]) {
        newErrors[field] = `${fieldLabels[field]} is required`;
      }
    });
  
    if (agentData.password !== agentData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
  
    if (!isPasswordValid(agentData.password)) {
      newErrors.password =
        "Password must contain at least one letter, one number, and one special character";
    }
    if (agentData.password.length < 10) {
      newErrors.password = "Password must be at least 10 characters long";
    }
    if (agentData.confirmPassword.length < 10) {
      newErrors.confirmPassword = "Confirm password must be at least 10 characters long";
    }
  
    setErrors(newErrors);
  
    // If there are no errors, the form is valid
    return Object.keys(newErrors).length === 0;
  };
  
  //********************* Form Submission Function ***********************/
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        if (emailRegex.test(agentData.email)) {
          setEmailValid("");
        } else {
          setEmailValid("Please Enter a Valid Email");
          return;
        }
        const result = await dispatch(
          addAgent({ agentData, update, addNew, aId })
        ).unwrap();
        toast.success("Agent data added successfully");
        navigate(-1);
      } catch (error) {
        console.error("Error adding agent:", error);
        toast.error(error?.message);
      }
    } else {
      toast.error("Please correct the errors in the form");
    }
  };
useEffect(()=>{
  const getAgentData = async() =>{
    const res = await fetchAllUserDataById(id);

    if(res){
    setAId(res._id)
    setAgentData({
      brandName: res.brandName|| "",
      agentId: res.agentId|| "",
      agentName: res.agentName|| "",
      email: res.email|| "",
      contact: res.contact|| "",
      password: res.password|| "",
      confirmPassword: res.confirmPassword|| "",
      roleType: res.roleType|| "",
    })
  }

   }
   getAgentData()
},[])


  return (
    <>
      <div className="fixed">
        <span className="absolute">
          <Nav />
        </span>
      </div>
      <div>
        <Header/>
      </div>
      <div className="md:ml-[22%] sm:ml-[33%] md:mx-0 sm:mx-0 mx-6 mt-12 ">
       
        <p className="text-[20px] font-head font-semibold pt-12 pb-6">
          Agent Details
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex md:flex-row sm:flex-row flex-col font-body md:gap-12 sm:gap-12">
            <span className="md:w-[40%] sm:w-[40%]">
            
              <div className="pt-3 pb-2">
                <label className="font-semibold">Agent Name <span className="text-red-500">*</span></label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 mt-2"
                  placeholder="Agent Name"
                  name="agentName"
                  onchange={handleInput}
                  type="text"
                  value={agentData.agentName}
                />
                {errors.agentName && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.agentName}
                  </p>
                )}
              </div>
              <div className="pt-3 pb-2">
                <label className="font-semibold">Email Id <span className="text-red-500">*</span></label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 mt-2"
                  placeholder="Email Id"
                  name="email"
                  onchange={handleInput}
                  type="email"
                  value={agentData.email}
                />
                {errors.email && (
                  <p className="text-red-500 mt-1 text-sm">{errors.email}</p>
                )}
                <p className="text-primary text-[13px] font-DMsan">{isEmailValid}</p>
              </div>
              <div className="pt-3 pb-2 relative">
                <label className="font-semibold">Password <span className="text-red-500">*</span></label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 mt-2"
                  placeholder="Password"
                  name="password"
                  onchange={handleInput}
                  type={showPassword ? "text" : "password"}
                  value={agentData.password}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 top-9 text-[18px] flex items-center"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
                {errors.password && (
                  <p className="text-red-500 mt-1 text-sm">{errors.password}</p>
                )}
              </div>
             
            </span>
            <span className="md:w-[40%] sm:w-[40%]">
              <div className="pt-3 pb-2">
                <label className="font-semibold">Agent Id <span className="text-red-500">*</span></label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 outline-none mt-2"
                  placeholder="Agent Id"
                  name="agentId"
                  onchange={handleInput}
                  type="text"
                  value={agentData.agentId}
                />
                {errors.agentId && (
                  <p className="text-red-500 mt-1 text-sm">{errors.agentId}</p>
                )}
              </div>
              <div className="pt-3 pb-2">
                <label className="font-semibold">Contact Number <span className="text-red-500">*</span></label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 mt-2"
                  placeholder="Contact Number"
                  name="contact"
                  onchange={handleInput}
                  type="number"
                  value={agentData.contact}
                />
                {errors.contact && (
                  <p className="text-red-500 mt-1 text-sm">{errors.contact}</p>
                )}
              </div>
              <div className="pt-3 pb-2 relative">
                <label className="font-semibold">Confirm Password <span className="text-red-500">*</span></label>
                <InputField
                  className="w-full h-10 bg-secondary rounded-md px-3 mt-2"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onchange={handleInput}
                  type={showConfirmPassword ? "text" : "password"}
                  value={agentData.confirmPassword}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-3 top-9 text-[18px] flex items-center"
                >
              {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </span>

           
          </div>
          <div className=" mt-9">
            <button
              type="submit"
              className="rounded-md px-6 py-2 bg-primary text-white mb-20"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAgentComponent;
