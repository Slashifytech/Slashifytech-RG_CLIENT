import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { formatDate } from "../helper/commonHelperFunc";
import html2pdf from "html2pdf.js";
import { getPolicyById } from "../../Util/UtilityFunction";
import { tlogo } from "../assets";
const PdfPage = forwardRef(({ id }, ref) => {
  const [policyData, setPolicyData] = useState();

  useEffect(() => {
    const getPolicies = async () => {
      const res = await getPolicyById(id);
      setPolicyData(res?.data[0]);
    };
    getPolicies();
  }, [id]);

  const pdfRef = useRef();
  const handleDownloadPDF = () => {
    const input = pdfRef.current;
    const opt = {
      margin: 0,
      filename:
        `${policyData?.policyId}_${policyData?.vehicleManufacturer}` ||
        "360 Policy",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      pagebreak: { mode: "avoid-all" },
    };
    html2pdf().from(input).set(opt).save();
  };

  useImperativeHandle(ref, () => ({
    handleDownloadPDF,
  }));

  return (
    <>
      <div ref={pdfRef}>
        <div className=" text-black rounded  py-8 px-6">
          <div style={{ padding: "20px" }} className="mt-1">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                margin: "20px",
                justifyContent: "center",
                gap: "25px",
              }}
            >
              <h1
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#2c3e50",
                  textAlign: "center",
                  marginBottom: "20px",
                  border: "3px solid black",
                  padding: "20px",
                  marginLeft: "30px",
                }}
              >
                Welcome to 360 Car Protect Extended Warranty
              </h1>

              <img
                src={tlogo}
                alt="360 Car Protect Logo"
                style={{ width: "12%" }}
              />
            </div>
            <div>
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: 1.6,
                  marginBottom: "15px",
                }}
              >
                Dear Customer,
              </p>
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: 1.6,
                  marginBottom: "15px",
                }}
              >
                Congratulations &amp; thank you for choosing to protect your
                Vehicle with the{" "}
                <span style={{ fontWeight: "bold" }}>
                  360 Car Protect Extended Warranty
                </span>
                .
              </p>
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: 1.6,
                  marginBottom: "15px",
                }}
              >
                You can now enjoy the benefits of{" "}
                <span style={{ fontWeight: "bold" }}>
                  360 Car Protect Extended Warranty
                </span>
                , as per the terms &amp; conditions set out in Annexure A.
              </p>
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: 1.6,
                  marginBottom: "15px",
                }}
              >
                We assure you pleasant memories &amp; happy driving with your
                favorite Vehicle. We request you to keep this document and its
                Annexures carefully as they would be required to be produced at
                the time of availing the{" "}
                <span style={{ fontWeight: "bold" }}>
                  360 Car Protect Extended Warranty
                </span>
                .
              </p>
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: 1.6,
                  marginBottom: "15px",
                }}
              >
                Wish you happy &amp; safe driving.
              </p>
            </div>
            <div
              style={{
                textAlign: "right",
                paddingTop: "20px",
                marginTop: "90px",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                _________________________
              </p>
              <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                (Stamp &amp; Signature)
              </p>
              <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                For 360 Car Protect India LLP
              </p>
              <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                Name of Signatory: [__]
              </p>
              <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                Location: [__]
              </p>
              <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                Date: [__]
              </p>
            </div>

            <p
              style={{
                border: "1px solid black",
                fontSize: "12px",
                padding: "20px",
                marginTop: "230px",
                fontFamily:
                  "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
                fontStyle: "italic",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Note:</span> 360 Car Protect
              India LLP is offering the 360 Car Protect Extended Warranty. 360
              Car Protect India LLP has engaged the services of Raam Autobahn
              India Private Limited for the limited purpose of marketing and
              selling the 360 Car Protect Extended Warranty to the Customers.
            </p>
          </div>
          <span className="text-[13px]">
            <div className="mt-[22%]">
              <h2 className="text-xl font-bold text-black-600 mt-6  mb-4 text-center underline">
                360 Car Protect Extended Warranty Certificate
              </h2>

              <table
                className="mt-16"
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  border: "1px solid black",
                }}
              >
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      Name of the Customer: {policyData?.customerName}
                    </td>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      Certificate No: {policyData?.policyId}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      Mobile No: {policyData?.contactNumber}
                    </td>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      Certificate issue date:{" "}
                      {formatDate(policyData?.createdAt)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      Customer Address: {policyData?.address}
                    </td>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      Cooling-off Period: {policyData?.coolingOffPeriod} _____
                      (30 days after the 360 Car Protect Extended Warranty Start
                      Date)
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      GSTIN Number (customer): {policyData?.customerGstNumber}
                    </td>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      Vehicle Manufacturer: {policyData?.vehicleManufacturer}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      Vehicle: {policyData?.vehicleModel}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      Fuel Type: {policyData?.fuelType}
                    </td>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      <b style={{ textDecoration: "underline" }}>
                        360 Car Protect Extended Warranty
                      </b>
                      <br />
                      Start Date: {policyData?.extWarrantyStartDate} <br />
                      End Date: {policyData?.extWarrantyEndDate}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  border: "1px solid black",
                  marginTop: "10px",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "center",
                      }}
                      colSpan="2"
                    >
                      MW Details:
                    </th>
                    <th
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "center",
                      }}
                      colSpan="2"
                    >
                      Odometer Reading:{" "}
                      <span style={{ fontWeight: "200" }}>
                        {policyData?.odometerReading}
                      </span>
                    </th>
                    <th
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "center",
                      }}
                    >
                      Manufacturing Year:{" "}
                      <span style={{ fontWeight: "200" }}>
                        {policyData?.manufacturingYear}
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "center",
                      }}
                    >
                      Vehicle Purchase Date:
                    </th>
                    <th
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "center",
                      }}
                    >
                      Vehicle First Registration Date
                    </th>
                    <th
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "center",
                      }}
                    >
                      Vehicle Registration No.
                    </th>
                    <th
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "center",
                      }}
                    >
                      Model/ Sub Model
                    </th>
                    <th
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "center",
                      }}
                    >
                      Vehicle Identification No.
                    </th>
                    <th
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "center",
                      }}
                    >
                      Ex-Showroom Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "center",
                      }}
                    >
                      {policyData?.vehiclePurchaseDate}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "center",
                      }}
                    >
                      {policyData?.vehicleFirstRegDate}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "center",
                      }}
                    >
                      {policyData?.vehicleRegNumber}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "center",
                      }}
                    >
                      {policyData?.vehicleModel}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "center",
                      }}
                    >
                      {policyData?.vehicleIdNumber}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "center",
                      }}
                    >
                      {policyData?.exshowroomPrice}
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3
                className="font-bold "
                style={{ textAlign: "center", marginTop: "60px" }}
              >
                Price Schedule
              </h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  border: "1px solid black",
                  marginTop: "10px",
                }}
              >
                <tbody>
                  <tr>
                    <th
                      style={{
                        width: "50%",
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "left",
                      }}
                    >
                      Product:
                    </th>
                    <td
                      style={{
                        width: "50%",
                        border: "1px solid black",
                        padding: "5px",
                      }}
                    >
                      360 Car Protect
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        width: "50%",
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "left",
                      }}
                    >
                      Product Price
                    </th>
                    <td
                      style={{
                        width: "50%",
                        border: "1px solid black",
                        padding: "5px",
                      }}
                    >
                      {policyData?.productPrice}
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        width: "50%",
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "left",
                      }}
                    >
                      CGST (9.00%)
                    </th>
                    <td
                      style={{
                        width: "50%",
                        border: "1px solid black",
                        padding: "5px",
                      }}
                    >
                      {policyData?.cgst}
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        width: "50%",
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "left",
                      }}
                    >
                      SGST (9.00%)
                    </th>
                    <td
                      style={{
                        width: "50%",
                        border: "1px solid black",
                        padding: "5px",
                      }}
                    >
                      {policyData?.sgst}
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        width: "50%",
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "left",
                      }}
                    >
                      IGST (18.00%)
                    </th>
                    <td
                      style={{
                        width: "50%",
                        border: "1px solid black",
                        padding: "5px",
                      }}
                    >
                      {policyData?.gst}
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        width: "50%",
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "left",
                      }}
                    >
                      Grand Total Price (Inc. Tax)(Rs.)
                    </th>
                    <td
                      style={{
                        width: "50%",
                        border: "1px solid black",
                        padding: "5px",
                      }}
                    >
                      {policyData?.totalPrice}
                    </td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        width: "50%",
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "left",
                      }}
                    >
                      Price in words
                    </th>
                    <td
                      style={{
                        width: "50%",
                        border: "1px solid black",
                        padding: "5px",
                      }}
                    >
                      {policyData?.totalPriceInWords}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mb-4 pt-12 flex flex-col text-end pb-16">
                <p>_________________________</p>
                <p>(Stamp &amp; Signature)</p>
                <p>For 360 Car Protect India LLP</p>
                <p>Name of Signatory: </p>
                <p>Location: </p>
                <p>Date: </p>
              </div>
              <div className="container">
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#4B5563",
                    textDecoration: "underline",
                    marginTop: "15%",
                    marginBottom: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  Important Notes:
                </h3>

                <ul
                  style={{
                    listStyleType: "decimal",
                    fontSize: "10px",
                    marginBottom: "1rem",
                    paddingLeft: "1.5rem",
                    lineHeight: 1.5,
                  }}
                >
                  <li>
                    360 Car Protect Extended Warranty is offered by 360 Car
                    Protect India LLP and not by the Vehicle Manufacturer, the
                    Dealer, or the Franchise Partner from whom the Customer may
                    have purchased the Vehicle.
                  </li>
                  <li style={{ marginTop: "10px", lineHeight: 1.5 }}>
                    By choosing to protect the Vehicle through the 360 Car
                    Protect Extended Warranty, the Customer hereby confirms that
                    they have read and understood the terms and conditions
                    governing the 360 Car Protect Extended Warranty set out in
                    this Certificate and in Annexure A and agrees and undertakes
                    to abide by the same.
                  </li>
                  <li style={{ marginTop: "10px", lineHeight: 1.5 }}>
                    Please note that any non-compliance or deviation by the
                    Customer of any of the terms and conditions contemplated in
                    the Certificate and in Annexure A shall render the 360 Car
                    Protect Extended Warranty as null and void and 360 Car
                    Protect India LLP shall not have any obligation or liability
                    to the Customer or any other person under the 360 Car
                    Protect Extended Warranty.
                  </li>
                  <li style={{ marginTop: "10px", lineHeight: 1.5 }}>
                    360 Car Protect Extended Warranty will be honored at all the
                    authorized service centers which are listed in Annexure B.
                    The said list may be updated from time to time by 360 Car
                    Protect India LLP on its website.
                  </li>
                  <li style={{ marginTop: "10px", lineHeight: 1.5 }}>
                    360 Car Protect Extended Warranty is exclusively offered by
                    360 Car Protect India LLP and the Vehicle Manufacturer
                    and/or Raam Autobahn India Private Limited, their personnel,
                    shareholders and directors shall not be liable for any loss
                    or damage that may be suffered by the Customer on account of
                    any acts or omissions of 360 Car Protect India LLP. The
                    Customer shall not make any claims related to the 360 Car
                    Protect Extended Warranty against the Vehicle Manufacturer
                    and/or Raam Autobahn India Private Limited, their personnel,
                    shareholders and directors under any circumstances.
                  </li>
                  <li style={{ marginTop: "10px", lineHeight: 1.5 }}>
                    The Customer agrees to obtain and maintain at all times a
                    valid comprehensive vehicle insurance policy for the Vehicle
                    and shall make claims under the said policy if the Vehicle
                    part is covered under the said policy before making any
                    claim under the 360 Car Protect Extended Warranty.
                  </li>
                  <li style={{ marginTop: "10px", lineHeight: 1.5 }}>
                    If the Customer is desirous of seeking cancellation of the
                    360 Car Protect Extended Warranty, the same can only be done
                    within 15 days from the date of issuance of the Certificate.
                    The Customer shall be refunded the entire amount paid by the
                    Customer (less the GST amount and less 10% of the total
                    amount paid by the Customer for obtaining the 360 Car
                    Protect Extended Warranty.
                  </li>
                  <li style={{ marginTop: "10px", lineHeight: 1.5 }}>
                    Any claim under the 360 Car Protect Extended Warranty can
                    only be made after the Cooling Off Period mentioned in the
                    Certificate.
                  </li>
                  <li style={{ marginTop: "10px", lineHeight: 1.5 }}>
                    The commencement of 360 Car Protect Extended Warranty is
                    subject to realization of payment by the Customer in full.
                    In case the payment is not realized for any reason
                    whatsoever, the 360 Car Protect Extended Warranty shall not
                    come into force and be void ab-initio.
                  </li>
                  <li style={{ marginTop: "10px", lineHeight: 1.5 }}>
                    The Customer must check the details in the Certificate and
                    the Annexures for accuracy immediately upon receiving it. If
                    the Customer finds any discrepancy or requires any changes
                    in the Certificate or in the Annexures thereto, the Customer
                    must immediately contact the representative of 360 Car
                    Protect India LLP and get the same rectified within 7 days
                    of receipt of the Certificate.
                  </li>
                </ul>
              </div>
              <div className="mt-[20%] border border-black pl-6 pb-6">
                <p className="font-bold underline text-center text-sm">
                  Customer Declaration:
                </p>
                <p className="text-center italic text-sm pr-2">
                  I / we hereby accept, that I / we have read and understood the
                  terms and conditions of 360 Car Protect Extended Warranty set
                  out in this Certificate and in Annexure A.
                </p>
                <p className="text-right pr-20 pt-3 text-sm">
                  Customer Signature:
                </p>
                <p className="text-right pr-20 text-sm">Date:</p>
              </div>
            </div>
            <div className="text-center border border-black font-bold text-[14px] mt-[44%] py-6">
              <span className="underline">Anexure A</span>
              <p>(360 CAR PROTECT EXTENDED WARRANTY – TERMS & CONDITIONS)</p>
            </div>
            <span className ="text-[10px]">
            <p className="mt-6">Dear Customer,</p>
            <p className="mt-3">
              360 Car Protect Extended Warranty is governed by and is subject to
              the terms, conditions and limitations set out in this Annexure A
              and in the Certificate issued to you by 360 Car Protect India LLP.
              360 Car Protect Extended Warranty covers the repairs/replacements
              of defective parts of the Vehicle (and the labour cost for the
              same) as per the terms, conditions and limitations set out in this
              Annexure A and in the Certificate. 360 Car Protect India LLP
              reserves its right to take the final decision on all matters
              relating to the 360 Car Protect Extended Warranty.
            </p>

            <p className="mt-3">
              <span className="font-bold">Eligiblity:</span>The Vehicle must be
              registered in India (and continued to be registered as such) for
              ‘private use’ only and should be less than 3 years old from the
              first date of registration of the Vehicle at the time of issuance
              of the Certificate by 360 Car Protect India LLP.
            </p>

            <p className="mt-3">
              <span className="font-bold">Warranty Period:</span>: 360 Car
              Protect Extended Warranty provides an additional coverage for your
              Vehicle between the Start Date and the End Date and within the
              time indicated in the Certificate issued by 360 Car Protect India
              LLP. However, any claim under the 360 Car Protect Extended
              Warranty can only be made after the Cooling Off Period mentioned
              in the Certificate. 360 Car Protect Extended Warranty can be used
              only for the Vehicle mentioned in the Certificate.
            </p>

            <p className="mt-3">
              <span className="font-bold">
                What is Covered under the 360 Car Protect Extended Warranty:
              </span>{" "}
              See Schedule A Below.
            </p>

            <p className="mt-3">
              <span className="font-bold">
                What is not Covered under the 360 Car Protect Extended Warranty:
              </span>{" "}
              See Schedule B Below.
            </p>

            <p className="mt-3">
              <span className="font-bold">
                How to use the 360 Car Protect Extended Warranty:
              </span>
              It is mandatory for the Customer to make sure that the Vehicle is
              taken to an authorized service center of 360 Car Protect India LLP
              three (3) months before the expiry of the Vehicle’s standard
              warranty given by the Vehicle Manufacturer for a general check-up
              which shall be undertaken at the cost of 360 Car Protect India
              LLP. Failure to comply with this requirement shall render the 360
              Car Protect Extended Warranty as null and void.
            </p>

            <p className="pt-3">
              If any part in the Vehicle is found to be defective and requires
              to be repaired/replaced as determined by the authorized service
              center of the Vehicle Manufacturer, the Customer shall get the
              said part repaired/replaced by the Vehicle Manufacturer at the
              authorized service center of the Vehicle Manufacturer if the same
              is within the standard warranty period offered by the Vehicle
              Manufacturer. However, if any part in the Vehicle is found to be
              defective and requires to be repaired/replaced under the 360 Car
              Protect Extended Warranty and the claim is made by the Customer
              within the warranty period mentioned in the Certificate issued by
              360 Car Protect India LLP (subject to the Cooling Off Period),
              then the Customer shall follow the steps set out below:
            </p>
            <p className="pt-3">
              After the warranty period commences, if any part in the Vehicle is
              found to be defective and requires to be repaired/replaced under
              the 360 Car Protect Extended Warranty and the claim is made by the
              Customer within the warranty period mentioned in the Certificate
              issued by 360 Car Protect India LLP (subject to the Cooling Off
              Period), then the Customer shall follow the steps set out below:
            </p>

            <ul className=" list-decimal list-outside">
              <li className="mt-3">
                Call the Customer Care Number{" "}
                <span className="font-bold">+91 7331100809</span> and provide
                the details of your 360 Car Protect Extended Warranty and the
                defective part of the Vehicle which is to be repaired/replaced.
              </li>{" "}
              <li>
                {" "}
                Take the Vehicle to the nearest authorized service center of 360
                Car Protect India LLP as indicated by our Customer Care
                representative at the Customer’s cost. Please show the original
                Certificate to our representative at the service center who will
                determine whether the Vehicle part is defective and whether it
                is to be repaired / replaced and whether the same is covered by
                the 360 Car Protect Extended Warranty.
              </li>
              <li>
                Once the claim of the Customer is accepted by our representative
                at the service center, the defective part will be repaired or
                replaced by the authorized service center of 360 Car Protect
                India LLP at its own cost. The decision of our authorized
                service center, whether to repair or to replace the defective
                part or to reject the claim if the same is not covered by the
                360 Car Protect Extended Warranty, shall be final and binding on
                the Customer.
              </li>
              <li>
                While the Vehicle is in the authorized service center of 360 Car
                Protect India LLP, the Customer and the Vehicle will also be
                governed by the terms and conditions imposed by the authorized
                service center
              </li>
            </ul>
            <p className="mt-[8%]">
              <span className="font-bold ">
                Compliance with Warranty provided by the Vehicle Manufacturer &
                Owner’s Manual provided by the Vehicle Manufacturer:{" "}
              </span>
              Customer must ensure that (a) the Customer complies with the terms
              and conditions of the warranty provided by the Vehicle
              Manufacturer; and (b) the Vehicle is, at all times, used and
              maintained as per the conditions stipulated in the Owner’s Manual
              provided by the Vehicle Manufacturer.
            </p>
            <p className="mt-3">
              <span className="font-bold ">Regular Servicing:</span>
              The Customer shall undertake all servicing and repairing of the
              Vehicle on a regular and periodic basis as advised by the Vehicle
              Manufacturer and as set out in the Owner’s Manual at the
              authorized service centers of the Vehicle Manufacturer only.
            </p>
            <p>
              The Customer shall not service or undertake or replace any Vehicle
              part (genuine or not) at an unauthorized service center of the
              Vehicle Manufacturer or by an unauthorized mechanic/technician
              other than the authorized service center of 360 Car Protect India
              LLP.
            </p>
            <p className="mt-60">
              Failure to comply with this requirement shall render the 360 Car
              Protect Extended Warranty null and void as regards the Vehicle
              part sought to be repaired or replaced under this 360 Car Protect
              Extended Warranty if the unauthorized service or repair or
              replacement of the Vehicle part deals with or affects (directly or
              indirectly) the Vehicle part sought to be repaired or replaced
              under the 360 Car Protect Extended Warranty.
            </p>

            <p className="mt-3">
              It may be noted that on account of a non-genuine part being used
              in the Vehicle, or servicing or repairing of a Vehicle part or
              component of the Vehicle in which the Vehicle part may be fitted,
              another Vehicle part may be adversely affected. In such cases
              also, the 360 Car Protect Extended Warranty shall be rendered as
              null and void.
            </p>

            <p className="pt-3">
              <span className="font-bold ">
                Genuine Parts and Quality Service:
              </span>
              : 360 Car Protect Extended Warranty ensures that your Vehicle is
              in good condition by using only genuine Vehicle parts and
              rendering quality service through experienced mechanics and
              technicians.{" "}
            </p>

            <p className="pt-3">
              <span className="font-bold ">
                360 Car Protect Extended Warranty is Transferable:
              </span>
              If you sell your Vehicle during the warranty period mentioned in
              the Certificate, you can transfer the 360 Car Protect Extended
              Warranty to the subsequent owner of your Vehicle, provided the
              transfer of the Vehicle is duly completed with the relevant Road
              Transport Authority, as per applicable laws and rules. Such new
              owner of the Vehicle can avail the benefits under this 360 Car
              Protect Extended Warranty, subject to compliance with the terms
              and conditions set out in this Annexure A. The new owner should
              inform 360 Car Protect India LLP through the Customer Care number
              about the change in ownership within 30 days from the date of
              transfer of ownership of the Vehicle to enable a smooth customer
              experience at our authorized service centers.
            </p>

            <p className="pt-3">
              <span className="font-bold ">Maximum Liability</span>The maximum
              liability of 360 Car Protect India LLP under the 360 Car Protect
              Extended Warranty shall be the lower of (a) the value of the
              defective parts to be repaired or replaced and the labour cost for
              the same; (b) the Depreciated Value of the Vehicle as per the
              table below. Other than repairing or replacing the defective parts
              in the Vehicle, 360 Car Protect India LLP shall not have any
              obligation or responsibility to replace the Vehicle and/or make
              payment for any consequential loss or damages to you or any third
              party. 360 Car Protect India LLP shall not be liable for any
              damage or loss caused to any property, article or individual
              (including disability or death) arising out of electric fault,
              short circuit, fire, negligent use of the Vehicle or accidental
              handling or mishandling of the Vehicle and/or non-compliance of
              the terms and conditions set out in this Annexure A.
            </p>

            <p className="mt-3 ">
              If the total cost for repairing and/or replacing the defective
              part is greater than the Depreciated Value of the Vehicle, then it
              shall be the discretion of 360 Car Protect India LLP to decide
              whether to repair / replace the defective part or to provide the
              Depreciated Value of the Vehicle to the Customer.
            </p></span>

            <p className="mt-3">
              <span className="font-bold">
                Governing Law/ Jurisdiction / Dispute Resolution:
              </span>{" "}
              The 360 Car Protect Extended Warranty shall be governed by
              applicable Indian laws. Courts at Hyderabad shall have exclusive
              jurisdiction in respect of all matters related to or arising out
              of the 360 Car Protect Extended Warranty
            </p>
            <div>
              <table className="min-w-full border-collapse border border-black mt-[70px]">
                <thead>
                  <tr>
                    <th
                      colSpan="2"
                      className="border border-black p-2 text-center"
                    >
                      TABLE FOR DEPRECIATED VALUE OF VEHICLE
                    </th>
                  </tr>
                  <tr>
                    <th className="border border-black p-2 text-center">
                      Year
                    </th>
                    <th className="border border-black p-2 text-center">
                      Percentage of the ex-showroom value of Vehicle at the time
                      of purchase (as indicated in the Certificate)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black p-2 text-center">
                      4<sup>th</sup> Year
                    </td>
                    <td className="border border-black p-2 text-center">60%</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 text-center">
                      5<sup>th</sup> Year
                    </td>
                    <td className="border border-black p-2 text-center">50%</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 text-center">
                      6<sup>th</sup> Year
                    </td>
                    <td className="border border-black p-2 text-center">40%</td>
                  </tr>
                </tbody>
              </table>

              <p className="mt-[4%] underline  font-bold text-center text-[14px] ">
                {" "}
                Schedue A
              </p>
              <p className="mt-[1%] underline  font-bold text-center text-[14px] ">
                {" "}
                (What is not Covered under the 360 Car Protect Extended
                Warranty)
              </p>

              <div className="list-inside text-[11px] mt-[9%]">
  <ul className="list-disc pl-5">
    <li>
      The 360 Car Protect Extended Warranty encompasses all mechanical and electrical parts, except those explicitly excluded under Schedule B, i.e., "What Is Not Covered."
    </li>
    <li>Labour cost for checking the defective part.</li>
    <li>Labour cost for repairing and/or replacing the part.</li>
    <li>Cost of replacement of part if the same is being replaced.</li>
    <li>
      Only genuine parts supplied and fitted by the Vehicle Manufacturer are covered under the 360 Car Protect Extended Warranty.
    </li>
  </ul>
</div>

              <p className="mt-[22%] underline  font-bold text-center text-[14px] ">
                {" "}
                Schedue B
              </p>
              <p className="mt-[1%] underline  font-bold text-center text-[14px] ">                {" "}
                (What is Covered under the 360 Car Protect Extended Warranty)
              </p>
              <div className="list-outside text-[11px] mt-[5%]">
                <li>
                  Any damages if the vehicle is not handled or driven in
                  accordance with the instructions in the Owner’s Manual
                  supplied with the vehicle and if the defined regular service /
                  maintenance work is not performed.
                </li>
                <li>
                  Any alterations to the vehicle's original technical
                  specifications or components, such as the installation of
                  additional electrical components, engine modifications, or any
                  other modifications that may impact vehicle performance or
                  safety.
                </li>
                <li>
                  Damage to the fuel system due to water, adulteration, or
                  foreign objects.
                </li>
                <li>
                  Damages arising from misuse, improper operation, storage,
                  transportation, modifications, maintenance, or repairs not in
                  accordance with Vehicle manufacturer's specifications.
                </li>
                <li>
                  Damages incurred due to accidents, general damage from
                  external forces, fire, liquid, collision, theft, secondary
                  damages resulting from these events, or consequential damages
                  stemming from accidents.
                </li>
                <li>The use of non-genuine or counterfeit parts.</li>
                <li>
                  The use of lubricants or accessories not approved by the
                  Vehicle manufacturer.
                </li>
                <li>
                  Exceeding permissible capacities, such as axle loads,
                  overloading, passenger counts, speed, and RPM limitations
                </li>
                <li>
                  Driving the vehicle under severe conditions, including
                  un-pliable or water-logged roads, races, or rallies.
                </li>
                <li>
                  Damages resulting from natural disasters, including but not
                  limited to earthquakes, storms, floods, fires, and accidents.{" "}
                </li>
                Commercial use of the vehicle or use for purposes other than its
                intended design.
                <li>
                  Use of adulterated or improper service products, such as fuel,
                  oils, brake fluids, coolants, interior cleaning materials, and
                  similar items
                </li>
                <li>
                  Retrofitted or installed equipment not recommended by Vehicle
                  manufacturer, such as radios, car telephones, CD/DVD players,
                  or other electronic gadgets
                </li>
                <li>
                  Cyber risks, including the loss, destruction, erasure,
                  corruption, or alteration of electronic data.
                </li>
                <li>
                  Sensory complaints related to noise, vibration, smell,
                  temperature of sidewalls, or footwells that may arise due to
                  factors such as vehicle upkeep, road conditions, usage
                  patterns, or environmental conditions, provided they do not
                  affect the vehicle's quality, function, or performance.
                </li>
                <li>
                  Consumable parts, including but not limited to belts, drive
                  chains, air cleaning elements, air conditioner dust filters,
                  fuel filters, oil filters, clutch components, brake parts,
                  wiper blades, bulbs, carbon brushes, and fuses
                </li>
                <li>
                  Costs associated with oil, grease, and other fluids, such as
                  engine oil, automatic transmission fluid, brake fluid,
                  coolant, etc. and other lubricants, with the exception of
                  expenses arising from routine repair work.{" "}
                </li>
                <li>
                  Wear-and-tear-related parts, such as tires, engine mountings,
                  transmission mountings, exhaust muffler mountings, other
                  rubber mountings, suspension-related parts, suspension
                  bushings, suspension ball joints, tie rod ends (excluding air
                  struts and shock absorbers), etc.
                </li>
                <li>Regular checking or washing of Vehicle</li>
                <li>Pick up and drop of the vehicle</li>
                <li>
                  {" "}
                  Other parts not covered include pulleys, dampers, bearings,
                  belts, tensioners, spark plugs, ignition coils, silencers,
                  mufflers, exhaust pipes, and more.{" "}
                </li>
                <li>Wheel alignment and wheel balancing</li>
                <li>
                  {" "}
                  Other parts not covered include pulleys, dampers, bearings,
                  belts, tensioners, spark plugs, ignition coils, silencers,
                  mufflers, exhaust pipes, and more.
                </li>
                <li>Wheel alignment and wheel balancing</li>
                <li>
                  Damage to any part caused by accident or rash and negligent
                  usage.{" "}
                </li>
                <li>Regular servicing or repairing of the Vehicle. </li>
                <li>
                  Routine maintenance services, including engine tune-ups,
                  cleaning and polishing, headlight and taillight maintenance,
                  headlight aiming, filter replacements, key fob battery
                  replacements, light bulb replacements, spark plug
                  replacements, drive belt replacements, clutch repairs,
                  silencer maintenance, catalytic converter maintenance, and
                  fuse and relay replacements.
                </li>
                <li>Concerns related to body and paint. </li>
                <li>
                   Components made of rubber and plastic, including oil seals.
                </li>
                <li>
                  {" "}
                  Corrosion-related parts such as exhaust mufflers, wheel rims,
                  etc.
                </li>
                <li> Battery replacement or recharging.</li>
                <li>
                  Under no circumstances will free repairs be provided under the
                  360 Car Protect Extended Warranty if it is discovered that the
                  vehicle identification number, such as the chassis/engine
                  number or odometer reading, has been tampered with or does not
                  align with the master data available at Authorized service
                  centers (Mentioned in Annexure B) or Vehicle manufacturer.
                </li>
                <li>
                  {" "}
                  If certain parts which are not available in market due to
                  non-production of those parts by the vehicle manufacturer in
                  India then 360 Car Protect India is not liable to replace that
                  particular part.
                </li>
              </div>
            </div>
            <div className="mt-10 border border-black pl-6 pb-6">
                <p className="font-bold underline text-center text-sm">
                  Customer Declaration:
                </p>
                <p className="text-center italic text-sm pr-2">
                  I / we hereby accept, that I / we have read and understood the
                  terms and conditions of 360 Car Protect Extended Warranty .
                </p>
                <p className="text-right pr-20 pt-3 text-sm">
                  Customer Signature:
                </p>
                <p className="text-right pr-20 text-sm">Date:</p>
              </div>
            <p className="font-bold underline mt-16 text-[12px] text-center ">
              ANNEXURE B
            </p>
            <p className="font-bold underline text-center ">
              (List of Authorized Service Centers)
            </p>
<span className="text-[11px]">
            <table className="min-w-full border-collapse border border-black mt-6">
              <thead>
                <tr>
                  <th className="border border-black p-1 pb-4 text-center">
                    City
                  </th>
                  <th className="border border-black p-1 pb-4 text-center">
                    Address
                  </th>
                  <th className="border border-black p-1 text-center">
                    Contact Number
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="w-full">
                  <td className="border border-black p-6 text-center w-1/6">
                    Pune
                  </td>
                  <td className="border border-black p-6 w-1/2">
                    No. 1331/1, Panchvati Warehouse Nagar, Wagholi, Pune -
                    412207
                  </td>
                  <td className="border border-black p-6 text-center w-1/6">
                    090750 30303
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="min-w-full border-collapse border border-black mt-6">
              <thead>
                <tr>
                  <th className="border border-black p-1 pb-4 text-center">
                    City
                  </th>
                  <th className="border border-black p-1 pb-4 text-center">
                    Address
                  </th>
                  <th className="border border-black p-1 text-center">
                    Contact Number
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="w-full">
                  <td className="border border-black p-6 text-center w-1/6">
                  KOLHAPUR
                  </td>
                  <td className="border border-black p-6 w-1/2">
                  Gat No. 489B, 2, Sambhaji Nagar Rd, opp. Hind Gear, near India Tiles, Shivaji Peth A Ward, Deokar Panand, 
                  Nagaon, Kolhapur, Maharashtra <br/> 416122
                  </td>
                  <td className="border border-black p-6 text-center w-1/6">
                  089560 24929
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="min-w-full border-collapse border border-black mt-6">
              <thead>
                <tr>
                  <th className="border border-black p-4 text-center">City</th>
                  <th className="border border-black p-4 text-center">
                    Address
                  </th>
                  <th className="border border-black p-4 text-center">
                    Contact Number
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="w-full">
                  <td className="border border-black p-4 text-center w-1/6">
                    Aurangabad
                  </td>
                  <td className="border border-black p-4 w-1/2">
                    MIDC, Gut.No.143, Ahmednagar - Aurangabad Rd, Waluj,
                    Aurangabad, Maharashtra 431136
                  </td>
                  <td className="border border-black p-4 text-center w-1/6">
                    088052 06555
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="min-w-full border-collapse border border-black mt-6">
              <thead>
                <tr>
                  <th className="border border-black p-4 text-center">City</th>
                  <th className="border border-black p-4 text-center">
                    Address
                  </th>
                  <th className="border border-black p-4 text-center">
                    Contact Number
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="w-full">
                  <td className="border border-black p-4 text-center w-1/6">
                    Nashik
                  </td>
                  <td className="border border-black p-4 w-1/2">
                    Garware Point, A-22, near Garware Point, MIDC Ambad, Nashik,
                    Maharashtra 422010
                  </td>
                  <td className="border border-black p-4 text-center w-1/6">
                    084466 01555
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="min-w-full border-collapse border border-black mt-9">
              <thead>
                <tr>
                  <th className="border border-black p-4 text-center">City</th>
                  <th className="border border-black p-4 text-center">
                    Address
                  </th>
                  <th className="border border-black p-4 text-center">
                    Contact Number
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="w-full">
                  <td className="border border-black p-4 text-center w-1/6">
                    Hyderabad
                  </td>
                  <td className="border border-black p-4 w-1/2">
                    B 29 & 30, Sanath Nagar Main Rd, Bhagat Singh Nagar, Sanath
                    Nagar IE, Sanath Nagar, Hyderabad, Telangana 500018
                  </td>
                  <td className="border border-black p-4 text-center w-1/6">
                    040300 03636
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="min-w-full border-collapse border border-black mt-6">
              <thead>
                <tr>
                  <th className="border border-black p-4 text-center">City</th>
                  <th className="border border-black p-4 text-center">
                    Address
                  </th>
                  <th className="border border-black p-4 text-center">
                    Contact Number
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="w-full">
                  <td className="border border-black p-4 text-center w-1/6">
                    Visakhapatnam
                  </td>
                  <td className="border border-black p-4 w-1/2">
                    Block-A, UTPL Campus IDA, Mindi, Visakhapatnam, Andhra
                    Pradesh 530012
                  </td>
                  <td className="border border-black p-4 text-center w-1/6">
                    091542 21699
                  </td>
                </tr>
              </tbody>
            </table>
</span>
        
        <div className="mt-10 border border-black pl-6 pb-6">
                <p className="font-bold underline text-center text-sm">
                  Customer Declaration:
                </p>
                <p className="text-center italic text-sm pr-2">
                  I / we hereby accept, that I / we have read and understood the
                  terms and conditions of 360 Car Protect Extended Warranty .
                </p>
                <p className="text-right pr-20 pt-3 text-sm">
                  Customer Signature:
                </p>
                <p className="text-right pr-20 text-sm">Date:</p>
              </div>
          </span>
        </div>
      </div>
    </>
  );
});

export default PdfPage;
