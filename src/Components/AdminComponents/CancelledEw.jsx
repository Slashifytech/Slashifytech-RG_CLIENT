import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import DataNotFound from "../../admin/DataNotFound";
import { CustomTableFour } from "../Table";
import { FaPencil } from "react-icons/fa6";
import Pagination from "../Pagination";
import { fetchEwLists } from "../../features/EwSlice";


const CancelledEw = () => {
  const { _id,  roleType } = useSelector(
      (state) => state.users?.users
    );
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
      dispatch(
        fetchEwLists({ page, perPage, searchTerm, userId: null, status: true })
      );

  
  }, [page, perPage, searchTerm]);

  const TABLE_HEAD = [
    "S.No.",
    "EW Id",
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
    status: data?.isDisabled || "NA",
    type: "ewPolicy",
  }));
useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    
     

      <div className="px-6 flex justify-start md:ml-[18%] sm:ml-44 mt-6">
        <input
          type="text"
          placeholder="Search by VIN number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[20rem] py-2 border border-gray-300 bg-white px-3 rounded-2xl outline-none"
        />
      </div>

      <p className="pt-5 text-[20px] font-semibold md:ml-[20%] sm:ml-[28%] ml-6">
        Ew Policy Lists-
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
              message="No Ew Policy found"
            />
          </div>
        ) : (
          <>
            <div className="md:ml-[19.5%] sm:ml-[36%] mt-6 mr-6  ">
              <CustomTableFour
                tableHead={TABLE_HEAD}
                tableRows={TABLE_ROWS}
                link={roleType === "2" ? "/agent/edit-AMC": "/admin/update-AMC"}
                redirectLink={"/amc-view"}
                action="Edit"
                icon={<FaPencil />}
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

export default CancelledEw;
