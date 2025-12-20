import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";
import DataNotFound from "../../admin/DataNotFound";
import { fetchUserById } from "../../../Util/UtilityFunction";
import Loader from "../Loader";
import RejectPopUp from "../RejectPopUp";
import { fetchamcLists } from "../../features/amcSlice";
import { updateAMCStatus } from "../../features/AMCapi";
import InvoicePopUp from "../InvoicePopUp";
import { setEmptyInvoiceData } from "../../features/InvoiceSlice";
import { ExtendedPolicyReadDataPopup } from "./EtendedPolicyReadDataPopup";

const AmcApproval = () => {
  const dispatch = useDispatch();
  const { amcLists } = useSelector((state) => state.amc);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const currentPage = amcLists?.pagination?.currentPage;
  const totalPagesCount = amcLists?.pagination?.totalPages;
  const totalCount = amcLists?.pagination?.totalItems;
  const [loading, setLoading] = useState(true);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  useEffect(() => {
    dispatch(
      fetchamcLists({
        page,
        perPage,
        option: null,
        options: null,
        status: "pending",
      })
    );
  }, [page, perPage]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div></div>

      <p className="font-semibold text-[24px] md:ml-72 sm:ml-44 ml-6 ">
        Pending Approval List
      </p>
      <div className="overflow-x-scroll w-full md:w-full md:overflow-hidden ">
        <ul className="bg-secondary text-[15px] py-7 flex flex-row justify-around items-center sm:w-[93%] w-[180%]  mr-10 md:ml-72 sm:ml-44 md:w-[75%]  gap-2 rounded-lg mt-8 h-[6vh]  text-black font-medium">
          <li className="md:w-[2%]">S.No</li>
          <li className="w-[32%] md:w-[36%] text-center">Description</li>
          <li className="w-[1%] text-center">Action</li>
        </ul>

        <div>
          {loading ? (
            <div className="mt-16 flex justify-center md:ml-32 sm:ml-52">
              {/* <Loading customText={"Loading"} /> */}
              <Loader />
            </div>
          ) : !totalCount ? (
            <DataNotFound
              className="flex justify-center flex-col w-full items-center mt-20 ml-28"
              message="No pending AMC found"
            />
          ) : (
            amcLists?.data
              ?.filter(
                (policy) =>
                  policy.amcStatus === "pending" ||
                  policy?.isCancelReq === "reqCancel"
              )
              .map((item, index) => (
                <ApprovalCard
                  key={item._id}
                  item={item}
                  index={index + 1 + (currentPage - 1) * perPage}
                />
              ))
          )}
        </div>

        {totalCount > 0 && (
          <div className="flex justify-center items-center  mt-9 mb-5 ml-28 ">
            <Pagination
              currentPage={currentPage}
              hasNextPage={currentPage * perPage < totalCount}
              hasPreviousPage={currentPage > 1}
              onPageChange={handlePageChange}
              totalPagesCount={totalPagesCount}
            />
          </div>
        )}
      </div>
    </>
  );
};

const ApprovalCard = ({ item, index }) => {
  const dispatch = useDispatch();
  const [agentData, setAgentData] = useState();
  const [isReasonPopUp, setIsReasonPopUp] = useState(false);
  const [isOpenExtPopup, setIsOpenExtPopup] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const openReasonPopUp = useCallback(() => setIsReasonPopUp(true));
  const closeReasonPopUp = useCallback(() => setIsReasonPopUp(false));
  const closeExtPopup = useCallback(() => setIsOpenExtPopup(false), []);
  const openPopUp = useCallback(() => setIsOpen(true));
  const closePopUp = useCallback(() => setIsOpen(false));
  const getAgentData = async () => {
    const data = await fetchUserById(item?.createdBy);
    setAgentData(data);
  };
  const openExtPopup = useCallback(() => {
    setIsOpenExtPopup(true);
  }, []);
  useEffect(() => {
    getAgentData();
  }, []);

  const handleStatus = async (userId, type, reason) => {
    try {
      const response = await updateAMCStatus(userId, type, reason);

      toast.success(response?.message || "AMC Updated Successfully");
      dispatch(
        fetchamcLists({
          optionf: null,
          optiond: null,
          options: null,
          optionh: null,
          status: "pending",
        })
      );
    } catch (error) {
      console.error(error, "Something went wrong");
      toast.error(error?.message || "Something Went Wrong");
    }
  };

  return (
    <>
      <ul className="text-[15px] flex flex-row justify-around items-start mx-6 sm:mx-6 md:mx-10 md:ml-72 sm:ml-44 gap-2 rounded-lg mt-8 text-black font-normal w-[180%] md:w-[80%] sm:w-[100%]">
        <li className="w-[2%]">{index}</li>
        <li className="w-[36%] px-3 text-start mb-3 py-3 rounded-lg bg-secondary  shadow">
          {agentData?.roleType === "0" ? "Admin" : "Agent"}:{" "}
          {agentData?.agentName}{" "}
          {item?.isCancelReq === "reqCancel"
            ? "Sent a request to cancel the AMC of"
            : " Sent a request to approve the AMC of"}{" "}
          {item?.customerDetails?.customerName} Vin Number - <b>{item?.vehicleDetails?.vinNumber} </b>
          <Link
            to={`/amc-view/${item?._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 text-primary cursor-pointer underline"
          >
            View AMC
          </Link>
          {item?.extendedPolicy?.at(-1)?.extendedStatus === "pending" && (
            <span className="cursor-pointer underline" onClick={openExtPopup}>
              View Extended Data
            </span>
          )}
        </li>

        <li className="md:w-[9%] w-[13%] text-center flex flex-col gap-2">
          {item?.isCancelReq === "reqCancel" ? (
            <Link
              onClick={() => handleStatus(item._id, "approvedReq")}
              className="py-1 px-5 bg-primary text-white rounded-lg cursor-pointer "
            >
              Approve
            </Link>
          ) : (
            <>
              <span
                onClick={() => {
                  dispatch(setEmptyInvoiceData());
                  openPopUp();
                }}
                className="py-1 px-5 bg-primary text-white rounded-lg cursor-pointer"
              >
                Accept
              </span>
              <span
                onClick={openReasonPopUp}
                className="py-1 px-5 text-primary border border-primary rounded-md font-medium cursor-pointer"
              >
                Decline
              </span>
            </>
          )}
        </li>
      </ul>
      <RejectPopUp
        isReasonPopUp={isReasonPopUp}
        closeReasonPopUp={closeReasonPopUp}
        handlePolicyStatus={handleStatus}
        item={item}
        subTitle={"  Please provide reason to reject the AMC !"}
      />
      <InvoicePopUp
        isOpen={isOpen}
        closePopUp={closePopUp}
        docType="AMC"
        id={item._id}
      />
      <ExtendedPolicyReadDataPopup
        closePopUp={closeExtPopup}
        isPopUpOpen={isOpenExtPopup}
        item={item}
      />
    </>
  );
};

export default AmcApproval;
