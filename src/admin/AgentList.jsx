import React, { useEffect, useState } from "react";
import AdminCards from "../Components/AdminCards";
import { SiMg } from "react-icons/si";
import { SiMercedes } from "react-icons/si";

import {
  deleteAgentData,
  fetchAllMbAgents,
  fetchAllMgAgents,
} from "../features/adminDashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Nav from "./Nav";
import DataNotFound from "./DataNotFound";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Loader from "../Components/Loader";

const AgentList = () => {
  const dispatch = useDispatch();
  const { mgAgents } = useSelector((state) => state.admin);

  const path = location.pathname;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchAllMgAgents());
  }, [dispatch]);

  const handleDelete = async (userId) => {
    try {
      const response = await dispatch(deleteAgentData(userId)).unwrap();
      toast.success("Agent deleted successfully");
      return response;
    } catch (error) {
      console.log("Error while deleting", error);
      toast.error("Failed to delete agent");
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
      {/* Navigation Bar */}
      <div className="fixed">
        <div className="absolute">
          <Nav />
        </div>
      </div>
  
      {/* Header */}
      <div>
        <Header />
      </div>
  
      {/* Loader / Main Content */}
      {loading ? (
        <div className="mt-60 flex justify-center md:ml-32 sm:ml-32">
          <Loader />
        </div>
      ) : (
        <>
          {/* Agent List Header */}
          <div className="flex flex-row items-start justify-between mr-9 mt-20">
            <p className="md:ml-[22%] sm:ml-[36%] ml-6 text-[23px] font-medium">
              Agent Lists - 
            </p>
            <Link to="/admin/add-agent" state={{ addNew: "isNew" }}>
              <p
                className={`rounded-md bg-primary text-white mb-9 font-normal md:px-6 sm:px-6 w-48 px-6 text-center py-2 cursor-pointer ${
                  path === "/admin/active-users" && "active"
                }`}
              >
                + Add New Agents
              </p>
            </Link>
          </div>
  
          {/* Agent List Display */}
          <div className="md:ml-[22%] sm:ml-[33%] ml-6 mb-20">
            <div className="flex flex-wrap gap-6 pt-2">
              {mgAgents?.length > 0 ? (
                mgAgents.map((agent) => (
                  <AdminCards
                    key={agent._id}
                    id={agent._id}
                    name={agent.agentName}
                    agentId={agent.agentId}
                    handleDelete={handleDelete}
                    link="/admin/agent-policies"
                    editLink="/admin/update-agent"
                    text="View More..."
                  />
                ))
              ) : (
                <div className="mt-20 font-medium text-body ml-[12%] mr-[15%] mb-20">
                  <DataNotFound
                    className="flex justify-center flex-col w-full items-center ml-28"
                    message="No agents found"
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}  

export default AgentList;
