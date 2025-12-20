import React, { useCallback, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import AgentDeletePopUp from "./AgentDeletePopUp";
const AdminCards = ({
  name,
  agentId,
  link,
  handleDelete,
  id,
  editLink,
  text,
  locationData
}) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const openPopUp = useCallback(() => setIsPopUpOpen(true), []);
  const closePopUp = useCallback(() => setIsPopUpOpen(false), []);
  const location  = useLocation()
  return (
    <>
      <div className="bg-secondary shadow flex flex-col items-center w-60 rounded-md pt-5 mt-3">
        <p className="font-medium  ">{name} </p>
        <p className="font-medium pt-1">{agentId}</p>
        {location.pathname === "/admin/team-lists" && (
          <p className="font-medium pt-1">{locationData}</p>
        )}
        <Link
          to={link}
          state={{ agentId: id }}
          className="text-white  bg-primary mt-2 px-12 py-2 cursor-pointer rounded-md"
        >
          {text}
        </Link>
        <div className="flex flex-row mt-4 gap-4 pb-9">
          <Link
            to={editLink}
            state={{ id: id, update: "isUpdate" }}
            className="text-primary cursor-pointer border border-primary  px-4 gap-2 py-1 flex items-center rounded-md"
          >
            Edit{" "}
            <span>
              <MdOutlineModeEdit />
            </span>
          </Link>
          <span
            onClick={openPopUp}
            className="text-primary cursor-pointer border border-primary gap-2 px-4 py-1 flex items-center rounded-md "
          >
            Delete{" "}
            <span>
              <RiDeleteBin6Line />
            </span>
          </span>
        </div>
      </div>
      <AgentDeletePopUp
        id={id}
        closePopUp={closePopUp}
        isPopUpOpen={isPopUpOpen}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default AdminCards;
