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
import { mgpdf } from "../assets";

const MgPdf = forwardRef(({ id }, ref) => {
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
      <div ref={pdfRef} className="mx-6 mb-80 mt-6 text-[13px]">
      <img src={mgpdf} alt="logo" loading="lazy" className="w-20 h-20"/>
        <p className="mb-4 text-center font-bold text-[22px]">Shine Car Pack</p>

        <p className="mb-4">Dear Customer,</p>
        <p className="mb-4">
          Congratulations & thank you for choosing the Shine Care Pack to
          maximize your savings and maintain the top-notch condition of your
          vehicle over the next 5 years!
        </p>
        <p className="mb-4">
          You can now enjoy the benefits of Shine Care, as per the terms &
          conditions set out in Annexure A.
        </p>
        <p className="mb-4">
          We assure you pleasant memories & happy driving with your favorite
          Vehicle. We request you to keep this document and its Annexures
          carefully as they would be required to be produced at the time of
          availing the Shine Care Pack.
        </p>
        <p className="mb-4">Wish you happy & safe driving.</p>

        <p className="font-normal pt-6">
          <span className="font-bold  underline "> Note: </span>
          Note: Raam 4 Wheelers LLP is offering the Shine Care Pack. Hence it is
          possible to avail the Shine Care Pack service only at the authorized
          Raam 4 Wheelers service centers
        </p>

        <div className="mt-[102%]">
          <h2 className="text-xl font-bold text-black-600  mb-4 text-center underline">
            SHINE CARE PACK CERTIFICATE
          </h2>

          <p className="mb-2 mt-16">
            <strong>Certificate No.:</strong> {policyData?.policyId}
          </p>
          <p className="mb-2">
            <strong>Certificate Issue Date:</strong>{" "}
            {formatDate(policyData?.createdAt)}
          </p>
          <p className="mb-2 pt-5">
            <strong>Name of Customer:</strong> {policyData?.customerName}
          </p>
          <p className="mb-2 pt-5">
            <strong>Customer GST No:</strong> {policyData?.customerGstNumber}
          </p>
          <p className="mb-2 pt-1">
            <strong>Address:</strong> {policyData?.address}
          </p>
          <p className="mb-2">
            <strong>Contact No.:</strong> {policyData?.contactNumber}
          </p>
          <p className="mb-2">
            <strong>Email Id:</strong> {policyData?.email}
          </p>
          <p className="mb-2">
            <strong>Pan Number:</strong> {policyData?.panNumber}
          </p>

          <div className="w-full flex justify-between items-start">
            <span>
              <p className="mb-2 pt-6">
                <strong>Vehicle Model:</strong> {policyData?.vehicleModel}
              </p>

              <p className="mb-2">
                <strong>Variant:</strong> {policyData?.variant}
              </p>
              <p className="mb-2">
                <strong>Fuel Type:</strong> {policyData?.fuelType}
              </p>

              <p className="mb-2">
                <strong>Vehicle Purchase Date:</strong>{" "}
                {formatDate(policyData?.vehiclePurchaseDate)}
              </p>

              <p className="mb-2">
                <strong>Odometer Reading:</strong> {policyData?.odometerReading}
              </p>

              <p className="mb-2 mr-20">
                <strong>Cooling-off Period:</strong> (30 days after the Shine Car
                Protect Extended Warranty Start Date)
              </p>
            </span>

            <span>
              <p className="mb-2 pt-6">
                <strong>Vehicle Manufacturer:</strong>{" "}
                {policyData?.vehicleManufacturer}
              </p>

              <p className="mb-2">
                <strong>Vehicle Identification No. :</strong>{" "}
                {policyData?.vehicleIdNumber}
              </p>

              <p className="mb-2">
                <strong>Vehicle Engine No. :</strong>{" "}
                {policyData?.vehicleEngineNumber}
              </p>

              <p className="mb-2 ">
                <strong>Vehicle Registration No.:</strong>{" "}
                {policyData?.vehicleRegNumber}
              </p>
              <p className="mb-2 ">
                <strong>Hypothecation:</strong> {policyData?.hypothecation}
              </p>
              <p className="mb-2">
                <strong>Ex-Showroom Price of Vehicle:</strong>{" "}
                {policyData?.exshowroomPrice}
              </p>
            </span>
          </div>
          <span className="flex flex-row  items-center justify-between gap-8">
            <p className="mb-2 ">
              <strong> Shine Car Pack Extended Warranty Start Date:</strong>{" "}
              {policyData?.extWarrantyStartDate}
            </p>
            <p className="mb-2">
              <strong>Shine Car Pack Extended Warranty End Date:</strong>{" "}
              {policyData?.extWarrantyEndDate}
            </p>
          </span>
          <div className="mb-4">
            <table className="min-w-full bg-white mt-9">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal ">
                  <th className="py-2 px-6 text-left border border-black">
                    Product
                  </th>
                  <th className="py-2 px-6 text-left border border-black">
                    Product Price (Rs)
                  </th>
                  <th className="py-2 px-6 text-left border border-black">
                    GST @ 18%
                  </th>

                  <th className="py-4 px-6 text-left border border-black">
                    Grand Total Price (incl. taxes) (Rs)
                  </th>
                </tr>
              </thead>
              <tbody className="text-black text-sm font-medium">
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap border border-black">
                    Shine Care Pack
                  </td>
                  <td className="py-3 px-6 border border-black text-left">
                    {policyData?.productPrice}
                  </td>
                  <td className="py-3 px-6 border border-black text-left">
                    {policyData?.gst}
                  </td>

                  <td className="py-3 border border-black px-6 text-left">
                    {policyData?.totalPrice}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-black-600 underline mt-[7%] mb-2 mx-10">
            Important Notes:
          </h3>

          <ul className="list-decimal list-outside items-start   mb-4">
            <li>
              Shine Care Pack is offered by Raam 4 Wheelers LLP and not by the
              Vehicle Manufacturer.
            </li>
            <li>
              By choosing to protect and service the Vehicle through the Shine
              Care Pack, the Customer hereby confirms that the Customer has read
              and understood the terms and conditions governing the Shine Care
              Pack set out in this Certificate and in Annexure A and agrees and
              undertakes to abide by the same
            </li>
            <li>
              Please note that any non-compliance or deviation by the Customer
              of any of the terms and conditions contemplated in the Certificate
              and in Annexure A shall render the Shine Care Pack as null and
              void and Raam 4 Wheelers LLP shall not have any obligation or
              liability to the Customer or any other person under the Shine Care
              Pack.
            </li>
            <li>
              Shine Care Pack will be honored at all the authorized MG
              Motorsservice centers of the Raam 4 Wheelers LLP
            </li>
          </ul>
          <div className="text-center border border-black font-bold text-xl mt-[20%] py-6">
            <span className="underline">Anexure A</span>
            <p>(SHINE CARE PACK– TERMS & CONDITIONS)</p>
          </div>
          <p className="mt-9">Dear Customer,</p>
          <p className="mt-6">
            Shine Care Pack is governed by and is subject to the terms,
            conditions and limitations set out in this Annexure A in the
            Certificate issued to you by Raam 4 Wheelers LLP. Shine Care Pack
            covers the following services as per the terms, conditions and
            limitations set out in this Annexure A and in the Certificate. Raam
            4 Wheelers LLP reserves its right to take the final decision on all
            matters relating to the Shine Care Pack.
          </p>

          <p className="mt-6">
            Eligibility: The Vehicle must be registered in India (and continued
            to be registered as such) for ‘private use’ only. The program covers
            a 5-year period from the date of purchase and includes the following
            services: dent repair, interior cleaning, pick-up and drop services,
            exterior car washes, and discounts on insurance renewals
          </p>

          <p className="mt-6">
            How to use the Shine Care Pack: It is mandatory for the Customer to
            make sure that the Vehicle is taken to an authorized service center
            of the Raam 4 Wheelers LLP and the certificate pertaining to Shine
            Care Pack is shown to the service representative.
          </p>
          <p className="mt-6">
            While the Vehicle is in the authorized service center of Raam 4
            Wheelers LLP, the Customer and the Vehicle will also be governed by
            the terms and conditions imposed by the authorized service center.
          </p>
          <p className="mt-6">
            Governing Law/ Jurisdiction / Dispute Resolution: The Shine Care
            Pack shall be governed by applicable Indian laws. Courts at
            Hyderabad shall have exclusive jurisdiction in respect of all
            matters related to or arising out of the Shine Care Pack.
          </p>
          <h3 className="text-xl font-bold text-black-600 underline mt-[75%] mb-5">
            Terms & Conditions
          </h3>

          <ul className="list-decimal list-outside items-start   mb-4">
            <li>
              Upfront Payment- Customers must pay the full amount upfront to
              avail of the benefits under this program.
            </li>
            <li>
              Denting and Painting Services <br />
              a. The Shine Care Pack covers 2 panels of denting and painting per
              year at no extra cost <br />
              b. Only the dents that do not exceed a diameter of 2 inches and do
              not involve structural damage or affect multiple layers of the
              car’s body are eligible to be repaired under the Shine Care Pack.
              c. Deep dents or severe damages, including but not limited to
              those caused by accidents or extreme conditions, are excluded from
              the Shine Care Pack. They can be repaired under the insurance
              policy or by paying total charges at the servicecenters. d.
              Customers must provide prior approval for any additional costs
              beyond the minor dent repair scope.
            </li>
            <li>
              Interior Cleaning <br /> a. One complimentary Premium Interior
              Cleaning package is offered each year. <br />
              b. This service includes vacuuming, cleaning of surfaces, and
              stain removal for minor spills. Major interior damage or
              deepseated stains will be subject to additional charges.
            </li>
            <li>
              Pick-up and Drop Services <br />
              a. Two free pick-up and drop services are included per year.{" "}
              <br />
              b. The service is only available within the Hyderabad premises.{" "}
              <br />
              c. Additional pick-up and drop services beyond the included one
              will be charged at the prevailing rates.
              <br />
              d. In cases where the vehicle's insurance policy is not active at
              the time of pick-up and drop, the dealership will not be liable
              for any damages incurred during transit. It is the sole
              responsibility of the customer to ensure that the vehicle’s
              insurance is valid and active prior to utilizing the pick-up and
              drop service.
              <br /> e. The dealership will facilitate the claim process for any
              damages to the vehicle caused by our driver or during transit to
              the service center, provided the vehicle's insurance policy is
              active. The dealership will also ensure that any effect on the
              no-claim bonus (NCB) for future insurance renewals is addressed.
              <br /> f. While the dealership will assist in processing claims
              for any damages, the actual claim settlement will be subject to
              the terms of the customer’s insurance policy.
            </li>
            <li>
              . Exterior Car Wash <br />
              a. One exterior car wash is included each year under this plan.{" "}
              <br />
              b. The wash covers basic cleaning and polishing. Additional
              detailing services are not included and will be charged separately
            </li>
            <li>
              Insurance Discounts <br />
              a. The Shine Care Pack provides yearly discounts on insurance
              renewal of the actual Own Damage (OD) premium, up to Rs.50,000
              over a period of 5years. <br /> b. The discount is applicable only
              if the insurance is renewed through Raam 4 Wheelers.
            </li>
            <li>
              Non-Transferability <br />
              a. The Shine Care Pack is non-transferable between vehicles or
              customers. <br />
              b. The services are only applicable to the vehicle under which the
              plan was initially purchased.
            </li>
            <li>
              Service Scheduling <br />
              a. Services under the Shine Care Pack must be scheduled in
              advance. <br />
              b. The company reserves the right to reschedule services based on
              availability
            </li>
            <li>
              Termination and Cancellation <br />
              a. The company reserves the right to terminate the Shine Care Pack
              if any fraud or misuse is detected.
            </li>
            <li>
              Refund <br />
              The customer may avail a full refund of the amount paid for Shine
              Care Pack in case they sell back the car to Raam4Wheelers LLP at
              any point of time.
            </li>
            <li>
              Liability Limitation <br />
              a. The company will not be liable for any consequential,
              incidental, or indirect damages arising from the services provided
              under this plan. <br />
              b. Any third-party services not directly offered by the company
              are not covered under this plan.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
});

export default MgPdf;
