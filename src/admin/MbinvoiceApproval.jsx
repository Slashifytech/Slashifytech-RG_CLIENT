import React, { useCallback, useEffect, useState } from "react";
import Nav from "./Nav";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPendingPolicy, updatePolicy } from "../features/policySlice";
import { toast } from "react-toastify";
import Pagination from "../Components/Pagination";
import { Link } from "react-router-dom";
import DataNotFound from "./DataNotFound";
import { fetchUserById } from "../../Util/UtilityFunction";
import Loader from "../Components/Loader";
import RejectPopUp from "../Components/RejectPopUp";
import ManufacturerTab from "../Components/ManufacturerTab";
import { fetchInvoices } from "../features/adminDashboardSlice";
import { approvalStatusChange } from "../features/adminApi";

const MbinvoiceApproval = () => {
  const dispatch = useDispatch();
  const { invoices } = useSelector((state) => state.admin);
  const [page, setPage] = useState(1);

  const perPage = 10;
  const currentPage = invoices?.data?.currentPage;
  const totalPagesCount = invoices?.data?.totalPagesCount;
  const totalCount = invoices?.data?.totalInvoicesCount;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    dispatch(
      fetchInvoices({
        page,
        perPage,
      })
    );
    setLoading(false);
  }, [dispatch, page, perPage]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <div className="fixed">
        <span className="absolute">
          <Nav />
        </span>
      </div>

      <p className="font-semibold text-[28px] md:ml-72 sm:ml-72 ml-6 pt-12">
        Pending List
      </p>
      <div className="overflow-x-scroll w-full md:w-full md:overflow-hidden ">
        <ul className="bg-secondary text-[15px] py-7 flex flex-row justify-around items-center sm:w-[93%] w-[180%]  mr-10 md:ml-72 sm:ml-72 md:w-[75%]  gap-2 rounded-lg mt-8 h-[6vh]  text-black font-medium">
          <li className="md:w-[2%]">S.No</li>
          <li className="w-[32%] md:w-[36%] text-center">Description</li>
          <li className="w-[1%] text-center">Action</li>
        </ul>

        <div>
          {loading ? (
            <div className="mt-16 flex justify-center md:ml-32 sm:ml-32">
              {/* <Loading customText={"Loading"} /> */}
              <Loader />
            </div>
          ) : totalCount === 0 ? (
            <DataNotFound
              className="flex justify-center flex-col w-full items-center mt-20 ml-28"
              message="No pending Invoices found"
            />
          ) : (
            invoices?.data?.invoiceData.map((item, index) => (
              <ApprovalCard
                key={item._id}
                item={item}
                index={index + 1 + (currentPage - 1) * perPage}
              />
            ))
          )}
        </div>

        <div className="flex justify-center items-center  mt-9 mb-20 ml-28 ">
          <Pagination
            currentPage={currentPage}
            hasNextPage={currentPage * perPage < totalCount}
            hasPreviousPage={currentPage > 1}
            onPageChange={handlePageChange}
            totalPagesCount={totalPagesCount}
          />
        </div>
      </div>
    </>
  );
};

const ApprovalCard = ({ item, index }) => {
  const dispatch = useDispatch();
  const [agentData, setAgentData] = useState();
  const [isReasonPopUp, setIsReasonPopUp] = useState(false);
  const openReasonPopUp = useCallback(() => setIsReasonPopUp(true));
  const closeReasonPopUp = useCallback(() => setIsReasonPopUp(false));
  const isStatus = "yetToApproved";

  const getAgentData = async () => {
    const data = await fetchUserById(item.userId);
    setAgentData(data);
  };

  useEffect(() => {
    getAgentData();
  }, []);

  const handleApprovalStatus = async (
    invoiceId,
    approvalStatus,
    optionalData = null,
    message
  ) => {
    try {
      const res = await approvalStatusChange(
        invoiceId,
        approvalStatus,
        message
      );
      toast.success(res?.message || "Invoice status changed");
      dispatch(fetchInvoices({}));
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Something went wrong");
    }
  };

  // Example usage

  return (
    <>
      <ul className="text-[15px] flex flex-row justify-around items-start mx-6 sm:mx-6 md:mx-10 md:ml-72 sm:ml-72 gap-2 rounded-lg mt-8 text-black font-normal w-[180%] md:w-[80%] sm:w-[100%]">
        <li className="w-[2%]">{index}</li>
        <li className="w-[36%] px-3 text-start mb-3 py-3 rounded-lg bg-secondary  shadow">
          {agentData?.roleType === "Admin"} Sent a request to approve the
          Invoice {item?.customerName} Id:{" "}
          <span className="font-medium">{item?.invoiceId || ""}</span>
          <Link
            to={`/invoice/${item?._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 text-primary cursor-pointer underline"
          >
            View Invoice
          </Link>
        </li>

        <li className="md:w-[9%] w-[13%] text-center flex flex-col gap-2">
          {item?.isCancelReq === "reqCancel" ? (
            <Link
              to="/admin/active-policy"
              onClick={() => handleApprovalStatus(item._id, "approvedReq")}
              className="py-1 px-5 bg-primary text-white rounded-lg cursor-pointer "
            >
              Approve
            </Link>
          ) : (
            <>
              <span
                onClick={() => handleApprovalStatus(item._id, "approved")}
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
        handlePolicyStatus={handleApprovalStatus}
        item={item}
        subTitle={"  Please provide reason to reject the Invoice !"}
      />
    </>
  );
};

export default MbinvoiceApproval;
