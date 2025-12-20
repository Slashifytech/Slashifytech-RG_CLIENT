import React, { useEffect, useState } from "react";
import AdminCards from "../Components/AdminCards";
import {
  deleteAgentData,
  fetchTeamMembers,
} from "../features/adminDashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Nav from "./Nav";
import DataNotFound from "./DataNotFound";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Loader from "../Components/Loader";

const TeamList = () => {
  const dispatch = useDispatch();
  const { TeamMembers } = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState("MG");
  const path = location.pathname;

  useEffect(() => {
    dispatch(fetchTeamMembers({ toggle }));
  }, [dispatch, toggle]);
  const toggleTab = (index) => {
    setToggle(index);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await dispatch(deleteAgentData(userId)).unwrap();
      toast.success("Team memeber deleted successfully");
      dispatch(fetchTeamMembers({ toggle }));

      return response;
    } catch (error) {
      console.log("Error while deleting", error);
      toast.error("Failed to delete Team memeber");
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="fixed">
        <span className="absolute">
          <Nav />
        </span>
      </div>
      <div><Header/></div>

      {loading ? (
      <div className="mt-60 flex justify-center md:ml-32 sm:ml-32">
        <Loader />
      </div>
    ) : (
      <>
      <div className="flex flex-row items-start justify-between mr-9  mt-20">
        <p className="md:ml-[22%] sm:ml-[30%] ml-6  text-[23px] font-medium">
          Team Lists -{" "}
        </p>
        <Link to="/admin/new-team" state={{ addNew: "isNew" }}>
          <p
            className={` rounded-md bg-primary text-white mb-9 font-normal  md:px-6 sm:px-6  w-48 px-6 text-center py-2 cursor-pointer ${
              path === "/admin/active-users" && "active"
            }`}
          >
            + Add New
          </p>
        </Link>
      </div>
      <div className="mx-6 md:mx-0 sm:mx-0 md:ml-[22%] sm:ml-[36%] flex md:gap-20 gap-3 ">
      </div>

      <div className="md:ml-[22%] sm:ml-[30%] ml-6 mb-20">
        <div className="flex flex-wrap gap-6 pt-2">
          {TeamMembers?.data?.length > 0 ? (
            TeamMembers?.data?.map((agent) => (
              <AdminCards
                key={agent._id}
                id={agent._id}
                name={agent.agentName}
                agentId={agent.agentId}
                locationData={agent.location}
                handleDelete={handleDelete}
                link="/admin/team-invoices"
                editLink="/admin/update-team"
                text={"View more"}
              />
            ))
          ) : (
            <div className="mt-20 font-medium text-body ml-[12%] mr-[15%] mb-20">
              <DataNotFound
                className="flex justify-center flex-col w-full items-center  ml-28"
                message="No Teams found"
              />
            </div>
          )}
        </div>
      </div>
    </>
    )}
    </>
  );
};

export default TeamList;
