

export const createdDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  return `${day} ${month} ${year}`;
};

export const addYearsToDate = (date, years) => {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate.toISOString().split("T")[0];
};

export const addYearsEndDate = (startDate, years) => {
  const date = new Date(startDate);
  date.setFullYear(date.getFullYear() + years);
  return date;
};
const calculatePercentage = (price, percentage) => {
  return (price * percentage) / 100;
};


export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0'); 
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`; 
};

export const roundToTwoDecimalPlaces = (num) => {
  return Math.round(num * 100) / 100;
};
export const formatFieldName = (field) => {
  switch (field) {
    case "customerName":
      return "Customer Name";
    case "address":
      return "Address";
    case "email":
      return "Email Address";
    case "panNumber":
      return "PAN Number";
    case "contactNumber":
      return "Contact Number";
    case "customerGstNumber":
      return "Customer GST Number";
    case "vehicleManufacturer":
      return "Vehicle Manufacturer";
    case "vehicleModel":
      return "Vehicle Model";
    case "ewVehicleEntryAge":
      return "Extended Warranty Vehicle Entry Age";
    case "vehicleEngineNumber":
      return "Vehicle Engine Number";
    case "vehicleIdNumber":
      return "Vehicle ID Number";
    case "vehicleRegNumber":
      return "Vehicle Registration Number";
    case "fuelType":
      return "Fuel Type";
    case "vehiclePurchaseDate":
      return "Vehicle Purchase Date";
    case "exshowroomPrice":
      return "Ex-Showroom Price";
    case "odometerReading":
      return "Odometer Reading";
    case "coolingOffPeriod":
      return "Cooling Off Period";
    case "extWarrantyStartDate":
      return "Extended Warranty Start Date";
    case "extWarrantyEndDate":
      return "Extended Warranty End Date";
    case "product":
      return "Product";
    case "typeOfPackage":
      return "Type of Package";
    case "productPrice":
      return "Product Price";
    case "gst":
      return "GST";
    case "totalPrice":
      return "Total Price";
    case "price":
      return "Price";
    case "hypothecation":
      return "Hypothecation";
    default:
      return field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }
};

export const getRelativeTime = (createdAt) => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();

  // Convert both dates to UTC to avoid time zone issues
  const createdUTC = Date.UTC(
    createdDate.getFullYear(),
    createdDate.getMonth(),
    createdDate.getDate()
  );

  const currentUTC = Date.UTC(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  const diffTime = Math.floor((currentUTC - createdUTC) / (1000 * 60 * 60 * 24));
  const remainingDays = Math.max(7 - diffTime, 0);

  return remainingDays > 0 ? `${remainingDays} day${remainingDays > 1 ? "s" : ""} left` : "Time expired";
};

export function extractFileNames(filePath) {
  // Get the last part of the path (filename)
  const fullName = filePath.split('/').pop();

  // Split by '-' to get the last part
  const parts = fullName.split('-');

  // Get the last part (before the extension)
  const lastPart = parts.pop(); // Remove the last part
  const nameWithExtension = lastPart.split('.'); // Split by '.'

  // Format the name correctly
  const formattedName = nameWithExtension[0]
      .split(' ')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join('.');

  // Get the file extension
  const extension = nameWithExtension.pop(); // Get the extension

  return `${formattedName}.${extension}`; // Combine formatted name with the extension
}



export function convertToIST(isoTime) {
  const date = new Date(isoTime);

  const istOffset = 5 * 60 + 30; 

  const istTime = new Date(date.getTime() + istOffset * 60 * 1000);

  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  return istTime.toLocaleString("en-IN", options);
}