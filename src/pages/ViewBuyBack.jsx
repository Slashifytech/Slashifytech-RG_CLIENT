import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import Loader from "../Components/Loader";
import { getBuyBackById } from "../features/BuybackApi";
import { formatDate } from "../helper/commonHelperFunc";
import { stamp } from "../assets";

const ViewBuyBack = forwardRef(({ id }, ref) => {
  const [data, setData] = useState();
  const location = useLocation();
  const buyBackId = id ? id : location?.state?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBuyBackById(buyBackId, null);
        setData(res?.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [buyBackId]);

  const pdfRef = useRef();
  const handleDownloadPDF = () => {
    const input = pdfRef.current;
    const opt = {
      margin: 0,
      filename: `${data?.vehicleDetails?.vinNumber}_Buyback` || "360_Invoice",
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
  if (!data) {
    return (
      <div className="mt-16 flex justify-center md:ml-32 sm:ml-32">
        {/* <Loading customText={"Loading"} /> */}
        <Loader />
      </div>
    );
  }
  return (
    <div ref={pdfRef} className=" p-6 font-body m-3 text-[13px] mx-20">
      <div className="flex flex-col items-start justify-center text-[14px]">
        <div className="flex items-center w-full justify-center">
          <p
            className="text-[16px]  text-center font-bold underline"
            style={{ margin: 0 }}
          >
            RG Buyback Assurance Program
          </p>
        </div>
        {/* Invoice Header */}
        <div className="mt-9 font-medium ">
          <p className="pt-5">
            Customer Name: {data?.customerDetails?.customerName || "NA"}
          </p>
          <p className="pt-5">Fuel Type: {data?.vehicleDetails?.fuelType}</p>

          <p className="pt-5">Model: {data?.vehicleDetails?.vehicleModel}</p>
          <p className="pt-5">VIN No. : {data?.vehicleDetails?.vinNumber}</p>
          <p className="pt-5">
            Agreement Start Date :{" "}
            {formatDate(data?.vehicleDetails?.agreementStartDate)}
          </p>
          <p className="pt-5">
            Agreement Valid Date:{" "}
            {formatDate(data?.vehicleDetails?.agreementValidDate)} <br />
            (OR) <br />
            1,00,000kms-Running of the vehicle, whichever of the two occurs
            Earlierr.
          </p>
          <p className="pt-5">
            Total Payment: Rs {data?.vehicleDetails?.totalPayment}
          </p>
        </div>

        <p className=" italic mt-4">
          By enrolling in the RG Buyback Assurance Program or availing its
          benefits, you acknowledge that you have read, understood, and agree to
          be bound by the following Terms and Conditions. If you do not agree,
          please revert on the email within 7 days from the date of policy
          generation.
        </p>

        {!(location?.pathname === "/buyback-view") && (
          <>
            <div className="mt-6 mb-20">
              <h1 className="font-bold text-[16px] underline">
                Terms and Conditions for RG Buyback Assurance Program
              </h1>
              <p className="pt-6">
                The following are the terms and conditions for the RG Buyback
                Assurance Program (hereinafter referred to as “Buyback
                Program”). The Buyback Program is operated by Market Value
                determined by the Raam 4 Wheelers LLP (hereinafter referred to
                as “Raam”).
              </p>
              <br />
              <p>
                The Customers agree to be bound by the following terms and
                conditions to exercise the Buyback Program.
              </p>
              <br />
              <ol>
                <li>
                  <strong>1. Description of the Buyback Program:</strong>
                  <p>
                    Upon purchase of the Buyback Program from Raam, the customer
                    obtains an assured Rs.1,20,000 higher value than the market
                    value (“Buyback Value”) determined by Raam or its authorised
                    valuation partner at the time of buyback, subject to the
                    terms and conditions set forth below.
                  </p>
                  <ul>
                    <li>
                      In case of an upgrade to a new model or exchange with the
                      same model & variant, the customer obtains an assured
                      exchange bonus of Rs.50,000.
                    </li>
                    <li>
                      The customers obtain the aforementioned value on selling
                      or exchanging certain specified MG cars (hereinafter
                      referred to as “MG Car”) to Raam, on which this Buyback
                      Program is applicable.
                    </li>
                  </ul>
                </li>
              </ol>
            </div>

            <div className="pt-40">
              <h2 className="">Program Applicability</h2>
              <p>
                The program applies exclusively to MG cars that meet the
                following criteria as of the date of sale or exchange with Raam:
                (i)The car is less than or equal to 8 years old. (ii)The car has
                been driven less than 1,00,000 kms, Whichever condition is met
                earlier will determine eligibility.
              </p>

              <h2 className="font-bold pt-6">
                2. Specific Terms and Conditions
              </h2>
              <ul className=" list-disc list-inside">
                <li className="pt-3">
                  This program is applicable exclusively to the MG Car mentioned
                  in the Buyback Assurance Program offered by RAAM.
                </li>
                <li className="pt-3">
                  The Buyback Program is valid only for the registered first
                  owner of the MG Car and not for any subsequent buyers/owners.
                </li>
                <li className="pt-3">
                  The Customer can avail of this Buyback Program on the
                  mentioned MG Car only after 180 days from the date of purchase
                  of the Buyback Program from Raam.
                </li>
                <li className="pt-3">
                  This Buyback Program is non-transferable.
                </li>
                <li className="pt-3">
                  The Customer shall not be entitled to avail of the Buyback
                  Program if their MG Windsor Car is: (i) Above 8 years old.
                  (ii) Driven more than 1,00,000 kms, Whichever condition is met
                  earlier will disqualify the vehicle.
                </li>
                <li className="pt-3">
                  This Buyback Program cannot be combined with any other
                  exchange offer at the time of redemption. If MG’s exchange
                  bonus is active, the higher value between the two offers will
                  be applicable.
                </li>
                <li className="pt-3">
                  In case the Customer fails to provide the original box,
                  original and spare key, charger, and other accessories for the
                  MG Car under the conditions specified above, the Buyback Value
                  shall be reduced accordingly.
                </li>
              </ul>

              <h2 className="font-bold pt-6">3. Eligibility of the Car</h2>
              <ul className="list-disc list-inside pt-6 ">
                <li>
                  The MG car must satisfy Raam in the following conditions:
                </li>
                <ul>
                  <li className="pt-3">
                    a.) The MG Car is in a roadworthy condition and free from
                    significant damage.
                  </li>
                  <li className="pt-3">
                    b.) All scheduled maintenance and services must have been
                    performed at authorized MG service centers only.
                  </li>
                  <li className="pt-3">
                    c.) The vehicle should not have been modified or altered
                    from its original specifications without approval from RAAM.
                  </li>
                  <li className="pt-3">
                    d.) The vehicle must have valid and existing insurance,
                    licenses, and registration at the time of buyback.
                  </li>
                  <li className="pt-3">
                    e.) The MG Car must not have been used for commercial
                    purposes (e.g., rentals, taxis, etc.).
                  </li>
                  <li className="pt-3">
                    f.) The car must not be involved in any fraud or
                    misrepresentation committed by the Customer.
                  </li>
                </ul>

                <li className="pt-6">
                  Any deviations or damages observed by the Raam in the MG Car
                  may affect the Buyback value.
                </li>
              </ul>
              <p className="pt-20">
                If the original MG Car satisfies all the quality checks stated
                above, only then will the customer be eligible to avail Buyback
                Program. If any or all of the quality checks stated above are
                not satisfied, the transaction may be cancelled or there may be
                reduction in the Buyback Value. The quality check shall be to
                the satisfaction of the field executive and his/ her decision
                shall be final in this regard.
              </p>

              <div>
                <h2 className="font-bold pt-6">
                  4. Determination of Buyback Value
                </h2>
                <p className="py-3">
                  In addition to the factors stated above, the market value of
                  the MG Car will be calculated based on industry-standard
                  parameters, including but not limited to: Vehicle condition,
                  Mileage, Model year, Service history, Age of the car,
                  Accessories,
                </p>

                <h2 className="font-bold pt-6">
                  5. Modes of Availing the Buyback Program
                </h2>
                <p className="py-3">
                  The Customer may avail of the Buyback Program through the
                  following options:
                </p>
                <ul>
                  <li className="ml-9">
                    a. The Customer can utilize the Buyback Value towards the
                    purchase of a new car sold by Raam. The price of the new
                    car, at all times, must be equal to or greater than the
                    Buyback Value.
                  </li>
                  <li className="ml-9">
                    b. The Customer may be entitled to receive the Buyback Value
                    as a monetary amount if no vehicle is purchased from Raam.
                  </li>
                </ul>

                <h2 className="font-bold pt-8">
                  6. Representations and Warranties by the Customer
                </h2>
                <ul className="list-disc list-inside">
                  <li className="pt-3">
                    The Customer should cooperate in the ownership transfer/RC
                    transfer to the new owner to whom Raam or its vendors will
                    sell the car. An amount of Rs.10,000 will be held by Raam
                    until the RC transfer is completed.
                  </li>
                  <li className="pt-3">
                    The Customer shall not have any claim/ownership over the
                    original MG Car and its accessories after the sale of the MG
                    Car to Raam is complete. The sale will be deemed complete
                    upon the following conditions: If the Customer opts to
                    receive the Buyback Value as money, the sale is complete
                    upon making payment of the Buyback Value (excluding the
                    amount held for RC transfer) by Raam to the Customer. If the
                    Customer opts to purchase a new car from Raam, the Buyback
                    Value shall be deducted from the price of the new car, and
                    the sale is complete upon the Customer receiving the gate
                    pass for the new car.
                  </li>
                </ul>
              </div>

              <div>
                <ul className="list-disc list-inside pt-32">
                  <li className="pt-4">
                    The Customer agrees that upon completion of the transaction,
                    ownership rights to the MG Car are transferred to Raam.
                  </li>
                  <li>
                    The Customer represents and warrants that there are no
                    leases, mortgages, contractual commitments, or any
                    third-party interests attached to the MG Car at the time of
                    availing of the Buyback Program.
                  </li>
                  <li className="pt-4">
                    The Customer is responsible for backing up and/or deleting
                    data (in cases of smart MG cars), and for clearing any
                    goods, personal belongings, or documents (not related to the
                    car) in the MG Car. Raam will not be liable for any personal
                    belongings or data left by the Customer.
                  </li>
                  <li className="pt-4">
                    The Customer agrees that Buyback eligibility and Buyback
                    Value are subject to Raam’s inspection. The Customer
                    understands that the original quotation for the MG Car may
                    be revised if inspection results differ from the Customer's
                    description.
                  </li>
                  <li className="pt-4">
                    The Customer acknowledges and agrees that the Buyback
                    transaction is final and cannot be canceled by the Customer
                    unless the quoted Buyback value has been declined at the
                    initial stage.
                  </li>
                  <li className="pt-4">
                    At the time of purchasing the Buyback Program, the Customer
                    agrees that they have read and accepted these detailed terms
                    and conditions for the Buyback to be exercised.
                  </li>
                  <li className="pt-4">
                    The Buyback Program can be exercised upon the purchase of a
                    new car, to be delivered at Raam’s store directly, subject
                    to the availability of the model of the car.
                  </li>
                  <li className="pt-4">
                    The Customer represents and warrants to release and hold
                    harmless Raam, its affiliates, and employees from and
                    against any claims, damages, or liabilities, including
                    third-party claims, property damage, or any direct,
                    indirect, consequential, incidental, or other damages, which
                    Raam may suffer as a result of this Buyback Program or the
                    acceptance or use of the MG Car by Raam.
                  </li>
                </ul>

                <h2 className="font-bold pt-6">7. Specifications</h2>
                <ul>
                  <li className="pt-4">
                    The Buyback Program is valid only in India.
                  </li>
                  <li className="pt-4">
                    The Buyback Program is open exclusively to end customers and
                    not resellers.
                  </li>
                  <li className="pt-4">
                    The Buyback Guarantee can be exercised only upon the sale of
                    the MG Car to Raam or the purchase of a new car in exchange
                    for the original MG Car from Raam.
                  </li>
                  <li className="pt-4">
                    The Buyback Program is specific to the customer who has
                    purchased the program from Raam and will be valid only for
                    the sale of the MG Car or exchange.
                  </li>
                </ul>
              </div>

              <div className="pt-20">
                <li className="pt-3">
                  with new car by the same owner as that of the customer who
                  bought the Buyback Program.
                </li>
                <ul className="list-disc list-inside pt-3"></ul>
                <li>
                  All taxes or liabilities payable to any regulatory authority
                  shall be borne by the customer and/or billed to the account of
                  the customer.
                </li>

                <h2 className="pt-6 font-bold">8. Termination</h2>
                <p>
                  The Buyback Program shall automatically terminate upon the
                  occurrence of the earliest of the following events:
                </p>
                <ul className="pt-3" style={{ listStyleType: "upper-roman" }}>
                  <li className="pt-3">
                    The successful sale or exchange of the MG Windsor car to
                    Raam or any third party.
                  </li>
                  <li className="pt-3">The car exceeding 8 years of age.</li>
                  <li className="pt-3">
                    The car being driven more than 1,00,000 kms.
                  </li>
                </ul>

                <h2 className="font-bold pt-6">9. Cancellation and Refund</h2>
                <p className="pt-3">
                  The Buyback Program can be canceled by the Customer only upon
                  the failure of RAAM to offer the customer's desired value of
                  Buyback on their MG car. Upon such cancellation, the customer
                  will be refunded the amount paid at the time of purchase of
                  the Buyback Program from Raam, excluding the GST amount paid.
                  However, the following conditions must be fulfilled to be
                  eligible for a refund:
                </p>
                <ul className="list-disc list-inside">
                  <li className="pt-3">
                    <strong>First Right of Refusal:</strong> The first right to
                    purchase the MG car at the customer’s desired price must be
                    given to RAAM. This means getting the MG car evaluated by
                    Raam is mandatory. If RAAM denies the customer’s desired
                    value via an official email, the customer is free to sell
                    the car elsewhere.
                  </li>
                  <li className="pt-3">
                    <strong>Proof of Resale Transaction:</strong> The customer
                    must provide proof of the transaction for the resale of the
                    MG car within 15 days from the date of refusal.
                  </li>
                  <li className="pt-3">
                    <strong>RC Transfer Proof:</strong> Proof of RC
                    (Registration Certificate) transfer to the new owner must be
                    provided by the customer to RAAM within 3 months from the
                    date of refusal.
                  </li>
                </ul>
                <p className="pt-6">
                  Once these proofs are submitted, the Buyback package amount
                  will be refunded to the customer’s account within 30 days.
                </p>

                <div className="pt-24">
                  <h2 className="font-bold pt-9">10. Dispute Resolution:</h2>
                  <p>
                    Any and all disputes, claims or demands (“Disputes”)
                    relating to or arising out of this Buyback Program shall be
                    resolved in the following manner: (i) Firstly, by mutual
                    negotiations by the Parties. (ii) If the Parties are unable
                    to amicably settle the Disputes through mutual negotiations
                    within a period of 30 days from the date of notice being
                    issued by a Party disclosing the nature of the Dispute and
                    its claim/demand, then the Dispute shall be settled through
                    arbitration under the Arbitration and Conciliation Act, 1996
                    by a sole arbitrator to be jointly appointed by the Parties.
                    The seat and venue of arbitration shall be at Hyderabad.
                  </p>
                  <p>
                    The Agreement between parties is governed by applicable laws
                    in India. The competent courts at Hyderabad shall have
                    exclusive jurisdiction to deal with the matter set out in
                    this Agreement.
                  </p>

                  <h2 className="font-bold pt-9">11. Indemnity:</h2>
                  <p>
                    Each Party (the “Indemnifier”) shall indemnify and keep
                    indemnified the other Party (the “Indemnified”) from and
                    against any and all losses, claims, damages, expenses and
                    costs that the Indemnified may incur or suffer on account of
                    any breach of the representations, warranties, covenants and
                    undertakings set out in this Agreement by the Indemnifier.
                  </p>
                  <p>
                    Raam hereby excludes and disclaims all liabilities, whether
                    direct or indirect, that may arise due to the Buyback
                    Program, including but not limited to postponement or
                    cancellation of the RG Car Exchange Plan.
                  </p>

                  <h2 className="font-bold pt-9">12. Modification:</h2>
                  <p>
                    RAAM 4Wheelers LLP reserves the right to modify or terminate
                    the Buyback Assurance Program at its discretion. However,
                    any changes will not affect customers who have already
                    enrolled in the Buyback Program.
                  </p>
                  <img src={stamp} alt="stamp" className="mt-9 w-[30%]" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default ViewBuyBack;
