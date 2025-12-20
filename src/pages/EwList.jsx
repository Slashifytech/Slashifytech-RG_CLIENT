import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../Components/Pagination";
import DataNotFound from "../admin/DataNotFound";
import { CustomTableFour } from "../Components/Table";
import { FaPencil } from "react-icons/fa6";
import Nav from "../admin/Nav";
import Loader from "../Components/Loader";
import SideNav from "../agent/SideNav";
import Header from "../Components/Header";
import {
  amcCancelByAdmin,

} from "../features/AMCapi";
import { toast } from "react-toastify";
import { IoMdDownload } from "react-icons/io";
import { downloadCsvData } from "../../Util/UtilityFunction";
import { fetchEwLists, setEmptytEw } from "../features/EwSlice";
import { ewCancelByAdmin, ewResubmit, updateEwStatus } from "../features/EwApi";
const AdminEwLists = () => {
  const { _id, roleType } = useSelector((state) => state.users?.users);
  const userId = roleType === "2" ? _id : null;
  const { EwLists } = useSelector((state) => state.ewPolicy);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 10;
  const currentPage = EwLists?.pagination?.currentPage;
  const totalPagesCount = EwLists?.pagination?.totalPages;
  const totalCount = EwLists?.pagination?.totalItems;
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    if (roleType === "2" && userId) {
      dispatch(
        fetchEwLists({ page, perPage, searchTerm, userId, option: null })
      );
    } else if (roleType === "0" || roleType === "1") {
      dispatch(
        fetchEwLists({
          page,
          perPage,
          searchTerm,
          userId: null,
          status: false,
        })
      );
    }

  }, [page, perPage, searchTerm, userId]);

  const TABLE_HEAD = [
    "S.No.",
    "Ew Id",
    "Bakend Policy Id ",
    "Name",
    "Email",
    "VIN No.",
    "Ew Issue date",
    "View/Download",
    "Status",
    "Action",
  ];

  const TABLE_ROWS = EwLists?.data?.map((data, index) => ({
    sno: (currentPage - 1) * perPage + index + 1,
    data: data || "NA",
    status: data?.ewStatus || "NA",
    type: "ewPolicy",
  }));

  const handleDispatch = () => {
    dispatch(setEmptytEw());
  };

  const handleResubmit = async (id) => {
    try {
      const res = await ewResubmit(id);
      if (roleType === "2" && userId) {
        dispatch(
          fetchEwLists({ page, perPage, option1: null, userId, option: null })
        );
      } else if (roleType === "0" || roleType === "1") {
        dispatch(
          fetchEwLists({
            page,
            perPage,
            option: null,
            userId,
            status: false,
          })
        );
      }
      toast.success(res?.message || "Amc resubmitted successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Something Went Wrong");
    }
  };
  const handleCancel = async (id) => {
    try {
      const res = await ewCancelByAdmin(id);
      dispatch(
        fetchEwLists({
          page,
          perPage,
          searchTerm,
          userId,
          status: false,
        })
      );
      toast.success(res?.message || "Amc cancelled successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Something Went Wrong");
    }
  };
  const handleStatus = async (userIdData, type, reason) => {
    try {
      const response = await updateEwStatus(userIdData, type, reason);

      toast.success(response?.message || "AMC Updated Successfully");
      dispatch(
        fetchEwLists({
          optionf: null,
          optiond: null,
          options: null,
          userId,
          status:  undefined,
        })
      );
    } catch (error) {
      console.error(error, "Something went wrong");
      toast.error(error?.message || "Something Went Wrong");
    }
  };

  
  const handleDownload = async () => {
    const path = "/ew-download"
    await downloadCsvData(path);
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
          {roleType === "2" ? <SideNav /> : <Nav />}
        </span>
      </div>
      <div>
        <Header />
      </div>
      <div className="md:pt-20 sm:pt-20 pt-6 flex md:flex-row sm:flex-row flex-col-reverse justify-between md:items-center sm:items-center md:px-20 mx-6">
        <Link
          onClick={handleDispatch}
          to={roleType === "2" ? "/agent/ewpolicy-form" : "/admin/add-ewpolicy"}
          className="px-6 bg-primary text-white rounded-md py-2 text-[16px] md:ml-[15.5%] sm:ml-[26%] mt-4 sm:mt-4 md:mt-4"
        >
          + Add New Ew
        </Link>

        {roleType === "0" && (
            <span
              onClick={handleDownload}
              className="px-6 bg-primary flex flex-row items-center cursor-pointer gap-3 text-white rounded-md py-2 text-[16px] md:ml-[15.5%] sm:ml-[26%] mt-4 sm:mt-4 md:mt-4"
            >
              Download CSV
              <IoMdDownload />
            </span>
          
        )}
      </div>

      <div className="px-6 flex justify-start md:ml-[18.5%] sm:ml-48 mt-6">
        <input
          type="text"
          placeholder="Search by VIN number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[20rem] py-2 border border-gray-300 bg-white px-3 rounded-2xl outline-none"
        />
      </div>

      <p className="pt-5 text-[20px] font-semibold md:ml-[21%] sm:ml-[28%] ml-6">
        Ew Lists-
      </p>

      <div className="font-head pt-4">
        {loading ? (
          <div className="mt-16 flex justify-center md:ml-32 sm:ml-32">
            <Loader />
          </div>
        ) : !totalCount ? (
          <div className="flex justify-center items-center h-[300px]">
            <DataNotFound
              className="flex justify-center flex-col w-full items-center md:mt-20 mt-12 md:ml-28 sm:ml-28"
              message="No EW Policy found"
            />
          </div>
        ) : (
          <>
            <div className="md:ml-[20.5%] sm:ml-[28%] mt-6 mr-6  ">
              <CustomTableFour
                tableHead={TABLE_HEAD}
                tableRows={TABLE_ROWS}
                link={
                  roleType === "2" ? "/agent/edit-ewpolicy" : "/admin/update-ewpolicy"
                }
                redirectLink={"/ew-view"}
                action="Edit"
                icon={<FaPencil />}
                handleResubmit={handleResubmit}
                handleStatus={handleStatus}
                handleCancel={handleCancel}
              />
            </div>
            {totalPagesCount > 1 && (
              <div className="flex justify-center items-center mt-3 mb-5 ml-52">
                <Pagination
                  currentPage={currentPage}
                  hasNextPage={currentPage * perPage < totalCount}
                  hasPreviousPage={currentPage > 1}
                  onPageChange={handlePageChange}
                  totalPagesCount={totalPagesCount}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AdminEwLists;
