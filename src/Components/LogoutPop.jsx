import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";


const LogoutPop = ({ isLogoutOpen, closeLogout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/raam-group/login");
    closeLogout();
  };

  useEffect(() => {
    if (isLogoutOpen) {
      Swal.fire({
        title: "Do you want to logout?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#000000",
        confirmButtonColor: "#000000",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        backdrop: true,
        customClass: {
          popup: "font-poppins text-sm",
          confirmButton: "swal-confirm",
          cancelButton: "swal-cancel",
          actions: "swal-actions", 
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
          handleLogout();
        } else {
          closeLogout();
        }
      });
    }
  }, [isLogoutOpen]);

  return null;
};

export default LogoutPop;
