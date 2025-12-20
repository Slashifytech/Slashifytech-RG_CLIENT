import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { formatDate } from './../helper/commonHelperFunc';
import { getPolicyById } from '../../Util/UtilityFunction';

const ViewPolicy = () => {

    const location = useLocation();
    const id = location.state.id
    const [policyData, setPolicyData] = useState()
   console.log(id, "check")
  useEffect(()=>{
    const getPolicies = async() =>{
      const res = await getPolicyById(id)
      setPolicyData(res?.data[0])
    }
    getPolicies()
  },[id])
  
  return (
<div className='md:px-32 mx-6'>
<h2 className="text-2xl font-bold text-black-600 mt-14 mb-4 text-center underline">
          360 Car Protect Extended Warranty Certificate
        </h2>
        <div>
      <table className="mt-16" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
        <tbody>
          <tr>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              Name of the Customer: {policyData?.customerName}
            </td>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              Certificate No: {policyData?.policyId}
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              Mobile No: {policyData?.contactNumber}
            </td>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              Certificate issue date: {formatDate(policyData?.createdAt)}
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              Customer Address: {policyData?.address}
            </td>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              Cooling-off Period: {policyData?.coolingOffPeriod} _____ (30 days after the 360 Car Protect Extended Warranty Start Date)
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              GSTIN Number (customer): {policyData?.customerGstNumber}
            </td>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              Vehicle Manufacturer: {policyData?.vehicleManufacturer}
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              Vehicle: {policyData?.vehicleModel}
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              Fuel Type: {policyData?.fuelType}
            </td>
            <td style={{ border: '1px solid black', padding: '5px' }}>
              <b style={{ textDecoration: 'underline' }}>360 Car Protect Extended Warranty</b><br />
              Start Date: {policyData?.extWarrantyStartDate} <br />
              End Date: {policyData?.extWarrantyEndDate} 
            </td>
          </tr>
        </tbody>
      </table>

      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black', marginTop: '10px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }} colSpan="2">MW Details:</th>
            <th style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }} colSpan="2">
              Odometer Reading: <span style={{ fontWeight: '200' }}>{policyData?.odometerReading}</span>
            </th>
            <th style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>
              Manufacturing Year: <span style={{ fontWeight: '200' }}>{policyData?.manufacturingYear}</span>
            </th>
          </tr>
          <tr>
            <th style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>Vehicle Purchase Date:</th>
            <th style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>Vehicle First Registration Date</th>
            <th style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>Vehicle Registration No.</th>
            <th style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>Model/ Sub Model</th>
            <th style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>Vehicle Identification No.</th>
            <th style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>Ex-Showroom Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>
              {policyData?.vehiclePurchaseDate}
            </td>
            <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>
              {policyData?.vehicleFirstRegDate}
            </td>
            <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>
              {policyData?.vehicleRegNumber}
            </td>
            <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>
              {policyData?.vehicleModel}
            </td>
            <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>
              {policyData?.vehicleIdNumber}
            </td>
            <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>
              {policyData?.exshowroomPrice}
            </td>
          </tr>
        </tbody>
      </table>

      <h3 className='font-bold ' style={{ textAlign: 'center', marginTop: '60px' }}>Price Schedule</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black', marginTop: '10px' }}>
        <tbody>
          <tr>
            <th style={{ width: '50%', border: '1px solid black', padding: '5px', textAlign: 'left' }}>Product:</th>
            <td style={{ width: '50%', border: '1px solid black', padding: '5px' }}>360 Car Protect</td>
          </tr>
          <tr>
            <th style={{ width: '50%', border: '1px solid black', padding: '5px', textAlign: 'left' }}>Product Price</th>
            <td style={{ width: '50%', border: '1px solid black', padding: '5px' }}>
              {policyData?.productPrice}
            </td>
          </tr>
          <tr>
            <th style={{ width: '50%', border: '1px solid black', padding: '5px', textAlign: 'left' }}>CGST (9.00%)</th>
            <td style={{ width: '50%', border: '1px solid black', padding: '5px' }}>
              {policyData?.cgst}
            </td>
          </tr>
          <tr>
            <th style={{ width: '50%', border: '1px solid black', padding: '5px', textAlign: 'left' }}>SGST (9.00%)</th>
            <td style={{ width: '50%', border: '1px solid black', padding: '5px' }}>
              {policyData?.sgst}
            </td>
          </tr>
          <tr>
            <th style={{ width: '50%', border: '1px solid black', padding: '5px', textAlign: 'left' }}>IGST (18.00%)</th>
            <td style={{ width: '50%', border: '1px solid black', padding: '5px' }}>
              {policyData?.gst}
            </td>
          </tr>
          <tr>
            <th style={{ width: '50%', border: '1px solid black', padding: '5px', textAlign: 'left' }}>
              Grand Total Price (Inc. Tax)(Rs.)
            </th>
            <td style={{ width: '50%', border: '1px solid black', padding: '5px' }}>
              {policyData?.totalPrice}
            </td>
          </tr>
          <tr>
            <th style={{ width: '50%', border: '1px solid black', padding: '5px', textAlign: 'left' }}>Price in words</th>
            <td style={{ width: '50%', border: '1px solid black', padding: '5px' }}>
              {policyData?.totalPriceInWords}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
        <div className="mb-4 pt-12 flex flex-col text-end pb-16">
          <p>_________________________</p>
          <p>(Stamp &amp; Signature)</p>
          <p>For 360 Car Protect India LLP</p>
          <p>Name of Signatory: </p>
          <p>Location: </p>
          <p>Date: </p>
        </div>
</div> 
 )
}

export default ViewPolicy