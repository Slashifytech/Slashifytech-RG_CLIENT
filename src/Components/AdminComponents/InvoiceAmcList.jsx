import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataNotFound from "../../admin/DataNotFound";
import Pagination from "../Pagination";
import { CustomTableOne } from "../Table";
import { FaPencil } from "react-icons/fa6";
import { fetchInvoiceByStatus } from "../../features/adminDashboardSlice";
import Loader from "../Loader";

const InvoiceAmcList = ({createdBy}) => {
  const dispatch = useDispatch();
  const { invoicesByStatus } = useSelector((state) => state.admin);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const perPage = 10;
  const currentPage = invoicesByStatus?.data?.currentPage;
  const totalPagesCount = invoicesByStatus?.data?.totalPagesCount;
  const totalCount = invoicesByStatus?.data?.totalInvoicesCount;
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  useEffect(() => {
    if (createdBy) {
      dispatch(
        fetchInvoiceByStatus({
          page,
          perPage,
          invoiceType: "AMC",
          search,
          createdBy,
        })
      );
    } else if(!createdBy) {
      dispatch(
        fetchInvoiceByStatus({ page, perPage, invoiceType: "AMC", search })
      );
    }
  }, [dispatch, page, perPage, search, createdBy]);

  const TABLE_HEAD = [
    "S.No.",
    
    "Invoice Id",
    "Customer Name",
    "Email",
    "Vin Number",
    "Invoice Issue Date",
    "View Invoice",
    "Downlaod Invoice",

    "Approvals",
  ];

  const TABLE_ROWS = invoicesByStatus?.data?.invoiceData?.map(
    (data, index) => ({
      sno: (currentPage - 1) * perPage + index + 1,
      id: data?.invoiceId || "NA",
      data: data || "NA",
      appId: data?._id,
    })
  );
    useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 2000); 
    
        return () => clearTimeout(timer);
      }, []);
  return (
    // <div>InvoiceList</div>

    <>

    {loading ? (
          <div className="mt-60 flex justify-center md:ml-32 sm:ml-32">
            <Loader />
          </div>
        ) : (
    <>
      <input
        type="text"
        placeholder="Search by Invoice Id"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-[20rem] py-2 border border-gray-300 bg-secondary px-3 rounded-2xl outline-none md:ml-[20%] sm:ml-[27%] sm:mt-6"
      />

      {totalCount > 0 ? (
        <>
          <div className="md:ml-[19.5%] sm:ml-[27%] mt-6 mr-6  ">
            <CustomTableOne
              tableHead={TABLE_HEAD}
              tableRows={TABLE_ROWS}
              link="/admin/invoice-edit"
              action={"Edit"}
              icon={<FaPencil />}
            />
          </div>
          <div className="mt-16 mb-10 ml-20"></div>
          <div className="flex justify-center items-center mt-3 mb-5 ml-52">
            {totalPagesCount > 1 && (
              <Pagination
                currentPage={currentPage}
                hasNextPage={currentPage * perPage < totalCount}
                hasPreviousPage={currentPage > 1}
                onPageChange={handlePageChange}
                totalPagesCount={totalPagesCount}
              />
            )}
          </div>
        </>
      ) : (
        <div className="mt-36 font-medium text-body ml-[12%] mr-[15%] mb-20">
          <DataNotFound
            className="flex justify-center flex-col w-full items-center mt-20 ml-28"
            message="No AMC Invoices found"
          />
        </div>
      )}
    </>
        )}
        </>
  );
};

export default InvoiceAmcList;
