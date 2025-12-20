import React, { useEffect,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SiMg } from "react-icons/si";
import { SiMercedes } from "react-icons/si";

import SideNav from "./SideNav";
import Pagination from "../Components/Pagination";
import Loader from "../Components/Loader";
import DataNotFound from "../admin/DataNotFound";
import { cancelReqPolicy } from "../features/policySlice";
import { toast } from "react-toastify";
import { resubmitPolicy } from "../features/agentApi";

import { CustomTableThree } from "../Components/Table";
import { FaPencil } from "react-icons/fa6";
import { fetchPolicyAllData } from "../features/policySlice";

const AgentDashboardComponent = () => {
  const { _id, agentName, brandName, agentId } = useSelector(
    (state) => state.users?.users
  );
  const userId = _id
  const {policies} = useSelector((state)=>state.policy)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;
  const currentPage = policies?.pagination?.currentPage;
  const totalPagesCount = policies?.pagination?.totalPages;
  const totalCount = policies?.pagination?.totalItems;
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(fetchPolicyAllData({ page, perPage, searchTerm, option:null, userId }));
    setLoading(false)
  }, [page, perPage, searchTerm]);


  const cancelPolicyRequest = async (id) => {
    try {
      const response = await dispatch(cancelReqPolicy(id)).unwrap();
      toast.info(response.message);
      dispatch(fetchPolicyAllData({   optionf: null,
          optiond: null,
          options: null,
          optionh: null,userId }));

      //  console.log(response.message);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  const handleResubmit = async (policyId) => {
    try {
      const res = await resubmitPolicy(policyId);
      toast.success(res?.message || "Policy resubmitted successfully");

      dispatch(fetchPolicyAllData({   optionf: null,
          optiond: null,
          options: null,
          optionh: null,userId }));
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Sommething went wrong");
    }
  };

  const TABLE_HEAD = [
    "S.No.",
    "Name",
    "Email",
    "Certificate No.",
    "Certificate Issue date",
    "View/Download",
    "Cancel Req",
    "Status",
    "Resubmit",
  ];

  const TABLE_ROWS = policies?.policies?.map((data, index) => ({
    sno: (currentPage - 1) * perPage + index + 1,
    data: data || "NA",
  }));

  

  return (
    <>
      <div className="fixed">
        <span className="absolute">
          <SideNav />
        </span>
      </div>

      <div className="flex items-center gap-3 justify-center md:ml-28 text-[18px] md:mt-10 sm:mt-10 mt-20">
        <span className="text-[22px]">
          {brandName === "MG" ? <SiMg /> : <SiMercedes />}
        </span>
        <span className="font-head font-semibold">
          {brandName === "MG" ? "Morris Garage" : "Mercedes-Benz"}
        </span>
      </div>

      <div className="md:pt-14 sm:pt-14 pt-6 flex md:flex-row sm:flex-row flex-col-reverse justify-between md:items-center sm:items-center md:px-20 mx-6">
        <Link
          to="/new-policy"
          state={{ policyType: brandName, addNew: "isNew" }}
          className="px-6 bg-primary text-white rounded-md py-2 text-[16px] md:ml-[16%] sm:ml-[33%] mt-4 sm:mt-4 md:mt-4"
        >
          + Add New Policy
        </Link>
        <span className="font-medium">
          {agentName} ({agentId})
        </span>
      </div>

      <div className="px-6 flex justify-center md:ml-28 sm:ml-60 mt-6">
        <input
          type="text"
          placeholder="Search by Policy ID / Engine Number / Vehicle Registration Number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[30rem] py-2 border border-gray-300 bg-secondary px-3 rounded-2xl outline-none"
        />
      </div>

      <p className="pt-5 text-[20px] font-semibold md:ml-[20%] sm:ml-[33%] ml-6">
        Policy List -
      </p>

      <div className="font-head pt-4">
        {loading ? (
          <div className="mt-16 flex justify-center md:ml-32 sm:ml-32">
            {/* <Loading customText={"Loading"} /> */}
            <Loader />
          </div>
        ) : policies.length === 0 ? (
          <div className="flex justify-center items-center h-[300px]">
            <DataNotFound
              className="flex justify-center flex-col w-full items-center md:mt-20 mt-12 md:ml-28 sm:ml-28"
              message="No agent policy found"
            />
          </div>
        ) : (
          <>
            <div className="md:ml-[19.5%] sm:ml-[36%] mt-6 mr-6  ">
              <CustomTableThree
                tableHead={TABLE_HEAD}
                tableRows={TABLE_ROWS}
                link="/invoice-form"
                brandName={brandName}
                cancelPolicyRequest={cancelPolicyRequest}
                action="Edit"
                icon={<FaPencil />}
                handleResubmit={handleResubmit}
              />
            </div>
            {totalPagesCount > 1 && (
              <div className="flex justify-center items-center mt-3 mb-5 ml-52">
                <Pagination
                  currentPage={currentPage}
                  hasNextPage={currentPage < totalPagesCount}
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
// const PolicyDataTable = ({ item, index, cancelPolicyRequest, brandName }) => {
//   const pdfRef = useRef();
//   const [isPopUpOpen, setIsPopUpOpen] = useState(false);
//   const openPopUp = useCallback(() => setIsPopUpOpen(true), []);
//   const closePopUp = useCallback(() => setIsPopUpOpen(false), []);

//   const handleDownloadClick = () => {
//     if (pdfRef.current) {
//       pdfRef.current.handleDownloadPDF();
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col md:mx-40  md:ml-[20%] ml-[14%] sm:ml-[38%] mx-6  md:w-[72%] w-[210%] sm:w-[105%] font-normal text-black text-[15px] items-start  font-DMsans mb-9">
//         <div className="flex text-[14px] flex-row justify-between items-start w-full my-1">
//           <p className="md:w-3 w-8">{index}</p>
//           <p className="md:w-32 w-[15%]">{item?.customerName}</p>
//           <p className="md:w-36 w-[15%]">{item?.policyId || "waiting"}</p>
//           <p className="">{formatDate(item?.createdAt)}</p>
//           <p className="md:w-36 w-[15%] sm:w-36 flex flex-row items-center gap-5 md:gap-5 sm:gap-2 text-[14px]">
//             <Link
//               to="/policy"
//               state={{ id: item?._id }}
//               className="bg-primary text-white py-1 px-3 cursor-pointer rounded-md"
//             >
//               View
//             </Link>
//             <span
//               onClick={handleDownloadClick}
//               className="bg-primary text-white py-1 px-3 cursor-pointer rounded-md"
//             >
//               Download
//             </span>
//           </p>

//           <p className="md:w-20 w-[10%] sm:w-28  flex flex-row items-center gap-3 text-[14px] ">
//             {item?.isCancelReq === "reqCancel" ? (
//               <span className="ps-6">Pending</span>
//             ) : item?.isCancelReq === "approvedReq" ? (
//               <span className="ps-6">Approved</span>
//             ) : item?.isDisabled === true ? (
//               <span className="ps-6">Approved</span>
//             ) : item?.policyStatus === "rejected" ? (
//               <span className="ps-6">Rejected</span>
//             ) : item?.policyStatus === "approved" ? (
//               <>
//                 <span className="text-[20px] ps-3 text-red-500">
//                   <TbPencilCancel />
//                 </span>
//                 <span className="cursor-pointer" onClick={openPopUp}>
//                   Request
//                 </span>
//               </>
//             ) : null}
//           </p>
//           <p className="md:w-40 w-[5%] ">
//             {item?.isDisabled === true && item?.policyStatus === "approved" ? (
//               <span className="bg-red-500 text-white rounded-md py-1 px-2">
//                 Cancelled
//               </span>
//             ) : item?.policyStatus === "approved" ? (
//               <span className="bg-green-500 text-white rounded-md py-1 px-3">
//                 Approved
//               </span>
//             ) : item?.policyStatus === "rejected" ? (
//               <span className="bg-red-500 text-white rounded-md py-1 px-3">
//                 Rejected
//               </span>
//             ) : (
//               <span className="bg-yellow-500  text-white rounded-md py-1 px-3">
//                 Pending
//               </span>
//             )}
//           </p>
//         </div>
//       </div>
//       <CancelReqPopUp
//         closePopUp={closePopUp}
//         isPopUpOpen={isPopUpOpen}
//         item={item}
//         cancelPolicyRequest={cancelPolicyRequest}
//       />
//       {brandName === "MB" ? (
//         <span className="hidden">
//           <PdfPage ref={pdfRef} id={item?._id} />
//         </span>
//       ) : brandName === "MG" ? (
//         <span className="hidden">
//           <MgPdf ref={pdfRef} id={item?._id} />
//         </span>
//       ) : null}
//     </>
//   );
// };

export default AgentDashboardComponent;
