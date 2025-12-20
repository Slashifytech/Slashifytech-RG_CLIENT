import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../Components/Pagination";
import DataNotFound from "../admin/DataNotFound";
import { CustomTableFour } from "../Components/Table";
import { FaPencil } from "react-icons/fa6";
import Nav from "../admin/Nav";
import { fetchamcLists, setEmptyAMC } from "../features/amcSlice";
import Loader from "../Components/Loader";
import SideNav from "../agent/SideNav";
import Header from "../Components/Header";
import {
  amcCancelByAdmin,
  amcExpenseNewExpense,
  amcResubmit,
  updateAMCStatus,
} from "../features/AMCapi";
import { toast } from "react-toastify";
import { RiUpload2Fill } from "react-icons/ri";
import Papa from "papaparse";
import { IoMdDownload } from "react-icons/io";
import { downloadCsvData } from "../../Util/UtilityFunction";
const AdminAmcList = () => {
  const { _id, roleType } = useSelector((state) => state.users?.users);
  const userId = roleType === "2" ? _id : null;
  const { amcLists } = useSelector((state) => state.amc);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 20;
  const currentPage = amcLists?.pagination?.currentPage;
  const totalPagesCount = amcLists?.pagination?.totalPages;
  const totalCount = amcLists?.pagination?.totalItems;
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
 
    if (roleType === "2" && userId) {
      dispatch(
        fetchamcLists({ page, perPage, searchTerm, userId, option: null })
      );
    } else if (roleType === "0" || roleType === "1") {
      dispatch(
        fetchamcLists({
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
    "AMC Id",
    "Name",
    "Email",
    "VIN No.",
    "AMC Issue date",
    "View Profile",
    "Extended Policy",
    "View/Download",
    "Status",
    "Action",
  ];

  const TABLE_ROWS = amcLists?.data?.map((data, index) => ({
    sno: (currentPage - 1) * perPage + index + 1,
    data: data || "NA",
    status: data?.amcStatus || "NA",
    type: "amc",
  }));

  const handleDispatch = () => {
    dispatch(setEmptyAMC());
  };

  const handleResubmit = async (id) => {
    try {
      const res = await amcResubmit(id);
      if (roleType === "2" && userId) {
        dispatch(
          fetchamcLists({ page, perPage, options: null, userId, option: null })
        );
      } else if (roleType === "0" || roleType === "1") {
        dispatch(
          fetchamcLists({
            page,
            perPage,
            optiond: null,
            userId: null,
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
      const res = await amcCancelByAdmin(id);
      dispatch(
        fetchamcLists({
          page,
          perPage,
          searchTerm,
          userId: null,
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
      const response = await updateAMCStatus(userIdData, type, reason);

      toast.success(response?.message || "AMC Updated Successfully");
      dispatch(
        fetchamcLists({
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

  
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validate CSV
  if (file.type !== "text/csv") {
    toast.error("Upload a valid CSV file.");
    return;
  }

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: async ({ data }) => {

      // STEP 1: Filter out empty VIN
      let filteredData = data.filter(row => row["VIN"]?.trim() !== "");

      // STEP 2: Allowed Service Types
      const allowedTypes = [
        "1st Free Service", "2nd Free Service", "3rd Free Service",
        "4th Free Service", "5th Free Service",
        "Preventive Maintenance-Paid Service(PMS)"
      ];

      filteredData = filteredData.filter(row =>
        allowedTypes.includes(row["Service Type"])
      );

      // STEP 3: Only PAID Services
      filteredData = filteredData.filter(row => row["Issue Type"] === "PAID");

      // STEP 4: Validate Price Match
      filteredData = filteredData.filter(row =>
        Number(row["Total Amount"]) === Number(row["Dealer Contribution"])
      );

      if (filteredData.length === 0) {
        toast.error("No valid entries found in CSV.");
        event.target.value = "";
        return;
      }

      // STEP 5: Extract & Format
      const formatted = filteredData.map(row => {
        let partsPrice = 0,
          labourPrice = 0,
          vasPrice = 0;

        const total = Number(row["Total Amount"]) || 0;
        const partType = row["Part/Labour"];
        const code = row["Part/Labour Code"] || "";

        if (partType === "P") {
          partsPrice += total;
        } else if (partType === "L") {
          code.startsWith("3M") ? (vasPrice += total) : (labourPrice += total);
        }

        return {
          serviceVinNumber: row["VIN"],
          serviceType: row["Service Type"],
          serviceDate: row["Delivery/ Closed Date"],
          partsPrice: String(partsPrice),
          labourPrice: String(labourPrice),
          vasPrice: String(vasPrice),
          serviceTotalAmount: String(partsPrice + labourPrice + vasPrice)
        };
      });

      // STEP 6: Group by VIN (Correct Payload)
      const grouped = Object.values(
        formatted.reduce((acc, curr) => {
          if (!acc[curr.serviceVinNumber]) {
            acc[curr.serviceVinNumber] = [];
          }
          acc[curr.serviceVinNumber].push(curr);
          return acc;
        }, {})
      ).map(vinGroup => ({
        serviceVinNumber: vinGroup[0].serviceVinNumber,
        expenses: vinGroup
      }));

      // STEP 7: Send in chunks
      const chunkSize = 50;
      let successCount = 0, failedCount = 0;

      for (let i = 0; i < grouped.length; i += chunkSize) {
        const chunk = grouped.slice(i, i + chunkSize);

        try {
          await amcExpenseNewExpense(chunk);
          successCount++;
        } catch (err) {
          console.error("Chunk Upload Failed:", err);
          failedCount++;
        }
      }

      if (successCount > 0) toast.success(`Uploaded successfully in ${successCount} batches ✔`);
      if (failedCount > 0) toast.error(`No new unique service AMC data entries to update`);

      event.target.value = "";
    },
  });
};


  const handleDownload = async () => {
    
    const path = "/amc-download"
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
      <div className="md:pt-20 sm:pt-20 pt-6 flex md:flex-row sm:flex-row flex-col-reverse justify-between md:items-center sm:items-center md:px-20 mx-6 ">
        <Link
          onClick={handleDispatch}
          to={roleType === "2" ? "/agent/amc-form" : "/admin/add-amc"}
          className="px-6 bg-primary text-white rounded-md py-2 text-[16px] md:ml-[15.5%] sm:ml-[26%] mt-4 sm:mt-4 md:mt-4 "
        >
          + Add New AMC
        </Link>

        {roleType === "0" && (
          <span className="flex flex-row items-center gap-6 ">
            <span
              onClick={handleDownload}
              className="px-6 bg-primary flex flex-row items-center cursor-pointer gap-3 text-white rounded-md py-2 text-[16px]  mt-4 sm:mt-4 md:mt-4"
            >
              Download CSV
              <IoMdDownload />
            </span>
            <label className="px-6 bg-primary flex flex-row items-center cursor-pointer gap-3 text-white rounded-md py-2 text-[16px]  mt-4 sm:mt-4 md:mt-4">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              Upload CSV
              <RiUpload2Fill />
            </label>
          </span>
        )}
      </div>

      <div className="px-6 flex justify-start md:ml-[18.5%] sm:ml-48 mt-6 ">
        <input
          type="text"
          placeholder="Search by VIN number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[20rem] py-2 border border-gray-300 bg-white px-3 rounded-2xl outline-none"
        />
      </div>

      <p className="pt-5 text-[20px] font-semibold md:ml-[21%] sm:ml-[28%] ml-6">
        AMC Lists-
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
              message="No AMC found"
            />
          </div>
        ) : (
          <>
            <div className="md:ml-[20.5%] sm:ml-[28%] mt-6 mr-6  ">
              <CustomTableFour
                tableHead={TABLE_HEAD}
                tableRows={TABLE_ROWS}
                link={
                  roleType === "2" ? "/agent/edit-AMC" : "/admin/update-AMC"
                }
                redirectLink={"/amc-view"}
                profileRedirectLink={"/amc/profile-view"}
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

export default AdminAmcList;
