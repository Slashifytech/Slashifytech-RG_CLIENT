import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useLocation, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import html2pdf from "html2pdf.js";
import { getInvoiceById } from "../features/InvoiceApi";
import { mgBlack, rgstamp, stampEw } from "../assets";
import { formatDate } from "../helper/commonHelperFunc";

const InvoiceView = forwardRef(({ id }, ref) => {
  const [data, setData] = useState();
  const { invoiceToken } = useParams();
  const invoiceId = id ? id : invoiceToken;
  let totalPrice = 0;
  let sgstAmount = 0;
  let cgstAmount = 0;

  if (data?.extendedPolicy?.additionalPrice) {
    // CASE 1: Extended Policy
    totalPrice = Number(data.extendedPolicy.additionalPrice);

    sgstAmount = totalPrice * 0.09; // 9%
    cgstAmount = totalPrice * 0.09; // 9%
  } else {
    // CASE 2: Normal AMC GST
    totalPrice = Number(data?.vehicleDetails?.gstAmount || 0);

    sgstAmount = Number(data?.vehicleDetails?.sgst || 0);
    cgstAmount = Number(data?.vehicleDetails?.cgst || 0);
  }

  const afterGstAmount = totalPrice + sgstAmount + cgstAmount;

  const formattedAmount = afterGstAmount.toFixed(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getInvoiceById(invoiceId);
        setData(res?.invoice);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [invoiceId]);
  const pdfRef = useRef();
  const handleDownloadPDF = () => {
    const input = pdfRef.current;
    const opt = {
      margin: 0,
      filename: `${data?.invoiceId}_Invoice` || "360_Invoice",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a3", orientation: "landscape" },
      pagebreak: { mode: "avoid-all" },
    };
    html2pdf().from(input).set(opt).save();
  };

  useImperativeHandle(ref, () => ({
    handleDownloadPDF,
  }));
  if (!data) {
    return (
      <div className="mt-16 flex justify-center md:ml-32 sm:ml-32">
        {/* <Loading customText={"Loading"} /> */}
        <Loader />
      </div>
    );
  }
  return (
    <div ref={pdfRef}>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          border: "1px solid #000",
          padding: "30px",
          margin: "20px",
        }}
      >
        {/* Header Section */}
        <div
          style={{
            display: "flex",
            // justifyContent: 'space-between',
            justifyContent: "center",
            gap: "50px",
            alignItems: "center",
            borderBottom: "2px solid #000",
            paddingBottom: "10px",
            marginBottom: "10px",
          }}
        >
          <div className="text-center">
            <h2 style={{ margin: "0", fontSize: "18px", fontWeight: "bold" }}>
              {data?.invoiceId?.includes("EW")
                ? "360 CAR PROTECT INDIA LLP"
                : "RAAM4WHEELERS LLP"}
            </h2>
            <p
              style={{
                textAlign: "center",
                fontSize: "12px",
                lineHeight: "1.5",
                margin: "3px 0",
              }}
            >
              {data?.invoiceId?.includes("EW") ? (
                <>
                  <span>
                    -4-138, 138/A Flat No.501, Royal Elegance, <br />
                    Himayathnagar, Barkatpura, Hyderabad, Hyderabad, Telangana,
                    500027
                    <br />
                  </span>
                  <span>
                    Ph: 7799935258, Email Id: ew@360carprotect.in
                    <br />
                    GSTIN: 36AADFZ5034G1Z5, PAN: AADFZ5034G
                  </span>
                </>
              ) : (
                <>
                  <span>
                    8-2-120/86/10,10A,11B,11C and 11D,
                    <br />
                    Opp: Hotel Park Hyatt,
                    <br />
                    Road Number 2, Banjara Hills Hyderabad, PIN-500033
                    <br />
                  </span>
                  <span>
                    Ph: 7799935258, Email Id: hyderabad.crmhead@mgdealer.co.in
                    <br />
                    Website:{" "}
                    <a
                      href="https://www.mghyderabad.co.in"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      www.mghyderabad.co.in
                    </a>
                    <br />
                    GSTIN: 36AAYFR9176L1ZY, CIN NO: AAN-7654, PAN: AAYFR9176L
                  </span>
                </>
              )}
            </p>
          </div>
          {!data?.invoiceId?.includes("EW") && (
            <div className="flex flex-col items-center">
              <img src={mgBlack} alt="MG Logo" style={{ height: "80px" }} />
              <p className="font-medium ">Morris Garages</p>
            </div>
          )}
        </div>

        {/* Invoice Details Section */}
        <div
          style={{
            borderBottom: "1px solid #000",
            paddingBottom: "10px",
            marginBottom: "10px",
          }}
        >
          <h3 style={{ margin: "0", fontSize: "16px" }}>
            Vehicle - Tax Invoice
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
            }}
          >
            <p>Invoice No: {data?.invoiceId}</p>
            <p>Invoice Date: {formatDate(data?.createdAt)}</p>
          </div>
        </div>

        {/* Billed, Shipped, and Delivery Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            marginBottom: "10px",
            borderBottom: "1px solid #000",
            paddingBottom: "10px",
          }}
        >
          {/* Billed To */}
          <div style={{ width: "30%" }}>
            <h4 style={{ margin: "0", fontSize: "14px" }}>Billed To:</h4>
            <p style={{ margin: "5px 0", lineHeight: "1.5" }}>
              Name: {data?.billingDetail?.customerName || "Not Available"}
              <br />
              Address: {data?.billingDetail?.address || "Not Available"}
              <br />
              Pin: {data?.billingDetail?.zipCode || "Not Available"}
              <br />
              Mobile: {data?.billingDetail?.contact || "Not Available"}
              <br />
              PAN No: {data?.billingDetail?.pan || "Not Available"}
              <br />
              State Code: {data?.billingDetail?.stateCode || "Not Available"}
              <br />
              GSTIN: {data?.billingDetail?.customerGst || "Not Available"}
            </p>
          </div>

          {/* Shipped To */}
          <div style={{ width: "30%" }}>
            <h4 style={{ margin: "0", fontSize: "14px" }}>Shipped To:</h4>
            <p style={{ margin: "5px 0", lineHeight: "1.5" }}>
              Name: {data?.shippingDetails?.customerName || "Not Available"}
              <br />
              Address:{" "}
              {data?.shippingDetails?.address ||
                "Not Available" ||
                "Not Available"}
              <br />
              Pin:{" "}
              {data?.shippingDetails?.zipCode ||
                "Not Available" ||
                "Not Available"}
              <br />
              Mobile:{" "}
              {data?.shippingDetails?.contact ||
                "Not Available" ||
                "Not Available"}
              <br />
              PAN No:{" "}
              {data?.shippingDetails?.pan || "Not Available" || "Not Available"}
              <br />
              State Code:{" "}
              {data?.shippingDetails?.stateCode ||
                "Not Available" ||
                "Not Available"}
              <br />
              GSTIN:{" "}
              {data?.shippingDetails?.customerGst ||
                "Not Available" ||
                "Not Available"}
            </p>
          </div>

          {/* Address of Delivery */}
          <div style={{ width: "30%" }}>
            {/* <h4 style={{ margin: "0", fontSize: "14px" }}>
              Address Of Delivery:
            </h4>
            <p style={{ margin: "5px 0", lineHeight: "1.5" }}>
           {data?.addressOfDelivery || "Not Available"}
            </p> */}
          </div>
        </div>

        {/* Footer Section */}
        <div
          style={{
            fontSize: "12px",
            marginTop: "10px",
            lineHeight: "1.5",
          }}
        >
          <p style={{ margin: "0" }}>
            <span className="flex flex-row items-center justify-between">
              <span className="flex flex-col">
                <span>
                  Hypothecated To:{" "}
                  {data?.vehicleDetails?.hypothecated || "Not Available"}{" "}
                </span>
                <span>
                  Branch Name:{" "}
                  {data?.vehicleDetails?.branchName || "Not Available"}
                </span>
              </span>
              {/* <span className="flex flex-col">
                <span>Order No: SS04117599</span>
                <span> Order Date: 25.11.2024</span>{" "}
              </span> */}
            </span>
          </p>
        </div>

        {/* Invoice Details Section */}

        {/* Invoice Header */}

        {/* Table Section */}
        <hr className="border border-black mt-2" />
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
            fontSize: "13px",
          }}
        >
          <thead>
            <tr
              className="border border-b border-black"
              style={{
                padding: "5px",
              }}
            >
              <th style={{ padding: "5px" }}>S.No</th>
              <th style={{ padding: "5px" }}>Description</th>
              {/* <th style={{ padding: "5px" }}>HSN</th> */}
              <th style={{ padding: "5px" }}>Qty.</th>
              <th style={{ padding: "5px" }}>Details</th>
              <th style={{ padding: "5px" }}>Rate (₹)</th>
              <th style={{ padding: "5px" }}>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "5px" }}>1</td>
              <td style={{ padding: "5px" }}>
                <span> {data?.vehicleDetails?.model || "Not Available"}</span>{" "}
                <br />
              </td>
              {/* <td style={{ padding: "5px" }}>87038030</td> */}
              <td style={{ padding: "5px" }}>1</td>
              <td style={{ padding: "5px" }}>Basic Price</td>
              <td style={{ padding: "5px" }}>
                {data?.vehicleDetails?.gstAmount || "Not Available"}
              </td>
              <td style={{ padding: "5px" }}>
                {data?.vehicleDetails?.gstAmount || "Not Available"}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Additional Information */}
        <div
          style={{
            marginTop: "20px",
            fontSize: "14px",
            lineHeight: "1.6",
          }}
        >
          <p
            style={{
              marginLeft: "93px",
              fontWeight: "lighter",
              fontSize: "12px",
            }}
          >
            {" "}
            VIN : {data?.vehicleDetails?.vinNumber || "Not Available"} <br />
            {/* MOTOR NO : U1RB060152 <br /> */}
            {/* EXTERIOR COLOUR : Turquoise Green <br /> */}
            {/* INTERIOR COLOUR : Black <br /> */}
            {/* KEY NO : A1RA200142 <br /> */}
            {/* ENGINE TYPE : {data?.vehicleDetails?.fuelType} <br /> */}
            {/* TRANSMISSION TYPE: Automatic <br /> */}
            {/* SEATING CAPACITY : 05 <br /> */}
          </p>

          <div>
            <hr className="border border-black ml-[60%]" />

            <p className="flex flex-row justify-end   ">
              {" "}
              <table
                style={{
                  width: "40%",
                  borderCollapse: "collapse",
                  marginTop: "9px",
                  fontSize: "12px",
                }}
              >
                <tbody>
                  <tr>
                    <td style={{ padding: "3px", fontWeight: "bold" }}>
                      Basic Price after discount
                    </td>
                    <td style={{ padding: "3px" }}>{totalPrice}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "3px", fontWeight: "bold" }}>
                      CGST@ 9%
                    </td>
                    <td style={{ padding: "3px" }}>{cgstAmount}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "3px", fontWeight: "bold" }}>
                      SGST@ 9%
                    </td>
                    <td style={{ padding: "3px" }}>{sgstAmount}</td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        border: "1px solid #000",
                        padding: "8px",
                        fontWeight: "bold",
                      }}
                    >
                      Total
                    </td>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>
                      {formattedAmount}
                    </td>
                  </tr>
                </tbody>
              </table>
            </p>
          </div>

          {/* <p style={{ marginTop: "20px" }}>
            Amount In Words:{" "}
            <b>
            {data?.vehicleDetails?.totalAmountInWords || "Not Available"}
            </b>
          </p> */}
          <p>
            Whether tax is payable on reverse charge basis - <b>No</b>
          </p>

          <div className="flex justify-end">
            {data?.invoiceId?.includes("EW") ? (
              <img src={stampEw} alt="ewstamp" className="w-[10%]" />
            ) : (
              <img src={rgstamp} alt="rgstamp" className="w-[10%]" />
            )}
          </div>

          <p style={{ textAlign: "right" }}>
            For{" "}
            {data?.invoiceId?.includes("EW") ? (
              <b>360 CAR PROTECT INDIA LLP</b>
            ) : (
              <b>RAAM4WHEELERS LLP</b>
            )}
          </p>
        </div>
      </div>
    </div>
  );
});

export default InvoiceView;
