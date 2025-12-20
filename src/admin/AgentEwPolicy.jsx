import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../Components/Pagination";
import Loader from "../Components/Loader";
import DataNotFound from "./DataNotFound";
import { CustomTableFour } from "../Components/Table";
import { FaPencil } from "react-icons/fa6";
import { fetchEwLists } from "../features/EwSlice";

const AgentEwPolicy = () => {
  const location = useLocation();
  const userId = location?.state?.agentId;
  const { EwLists } = useSelector((state) => state.ewPolicy);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
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
    if (userId) {
      dispatch(
        fetchEwLists({ page, perPage, searchTerm, userId, option: null })
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

  return (
    <>
   

    

      

      <div className="px-6 flex justify-start md:ml-[18%] sm:ml-60 mt-6">
        <input
          type="text"
          placeholder="Search by VIN number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
         className="w-[20rem] py-2 border border-gray-300  bg-white px-3 rounded-2xl outline-none"
        />
      </div>

      <p className="pt-5 text-[20px] font-semibold md:ml-[20%] sm:ml-[33%] ml-6">
        Ew Lists-
      </p>

      <div className="font-head pt-4">
        {loading ? (
          <div className="mt-16 flex justify-center md:ml-32 sm:ml-32">
            {/* <Loading customText={"Loading"} /> */}
            <Loader />
          </div>
        ) : !totalCount ? (
          <div className="flex justify-center items-center h-[300px]">
            <DataNotFound
              className="flex justify-center flex-col w-full items-center md:mt-20 mt-12 md:ml-28 sm:ml-28"
              message="No Buy Back found"
            />
          </div>
        ) : (
          <>
            <div className="md:ml-[19.5%] sm:ml-[36%] mt-6 mr-6  ">
              <CustomTableFour
                tableHead={TABLE_HEAD}
                tableRows={TABLE_ROWS}
                link="/admin/update-ewpolicy"
                action="Edit"
                icon={<FaPencil />}
                redirectLink={"/ew-view"}
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

export default AgentEwPolicy;
