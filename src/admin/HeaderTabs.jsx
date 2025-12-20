import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const HeaderTab = () => {
  const location = useLocation();
  const path = location.pathname;
  const [activeTab, setActiveTab] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setActiveTab(path);

    if (containerRef.current) {
      const activeElement = containerRef.current.querySelector(".active");
      if (activeElement) {
        const scrollLeft =
          activeElement.offsetLeft -
          containerRef.current.offsetWidth / 2 +
          activeElement.offsetWidth / 2;
        containerRef.current.scrollLeft = scrollLeft;
      }
    }
  }, [path]);

  return (
    <>
      <div className="flex md:flex-row sm:flex-row flex-col md:justify-start sm:justify-start justify-start items-start md:items-center sm:items-center mx-6  md:pt-9 sm:pt-9 pt-20 md:gap-16 overflow-x-scroll md:mx-6 sm:mx-9 scrollbar-hide sm:gap-10">
        <Link to="/admin/add-amc">
          <p
            className={`rounded-md bg-primary text-white mb-9 py-2 font-normal md:px-6 sm:px-6 sm:w-56 w-56 md:w-56 px-6 text-center cursor-pointer
            }`}
          >
            + Add New AMC
          </p>
        </Link>
        <Link
          to="/admin/add-buyback"
        >
          <p
            className={`rounded-md bg-primary text-white mb-9 py-2 font-normal md:px-6 sm:px-6 sm:w-56 w-56 md:w-56 px-6 text-center cursor-pointer
            }`}
          >
            + Add New Buy Back
          </p>
        </Link>
        <Link
          to="/admin/add-policies"
          state={{ policyType: "MG", addNew: "isNew" }}
        >
          <p
            className={` rounded-md bg-primary text-white mb-9 font-normal md:px-6 sm:px-6 w-56 px-6 text-center py-2 cursor-pointer ${
              path === "/admin/male-users" && "active"
            }`}
          >
            + Add New MG Policies
          </p>
        </Link>
      </div>
    </>
  );
};

// const SubTab = () => {
//   const location = useLocation();
// const path = location.pathname;
// const [activeTab, setActiveTab] = useState(null);
// const containerRef = useRef(null);

// useEffect(() => {
//   setActiveTab(path);

//   if (containerRef.current) {
//     const activeElement = containerRef.current.querySelector(".active");
//     if (activeElement) {
//       const scrollLeft =
//         activeElement.offsetLeft -
//         containerRef.current.offsetWidth / 2 +
//         activeElement.offsetWidth / 2;
//       containerRef.current.scrollLeft = scrollLeft;
//     }
//   }
// }, [path]);
//   return (
//     <>
//     <div
//     ref={containerRef}
//     className="flex md:justify-start sm:justify-start justify-start items-center gap-9 md:mt-9 sm:mt-9 mt-20 md:gap-28 overflow-x-scroll md:mx-6 sm:mx-9 scrollbar-hide sm:gap-10"
//   >
//     <Link to="/admin/active-users">
//       <p
//         className={`bg-[#FCFCFC] border border-primary rounded-xl hover:bg-primary hover:text-white mb-9 font-medium md:px-6 sm:px-6 w-44 px-6 text-center py-2 cursor-pointer ${
//           path === "/admin/active-users" && "active"
//         }`}
//       >
//         MB
//       </p>
//     </Link>

//     <Link to="/admin/male-users">
//       <p
//         className={`bg-[#FCFCFC] rounded-xl border border-primary  hover:bg-primary hover:text-white mb-9 font-medium md:px-6 sm:px-6 w-44 px-6 text-center py-2 cursor-pointer ${
//           path === "/admin/male-users" && "active"
//         }`}
//       >
//        MG
//       </p>
//     </Link>

//   </div>
// </>
//   )
// }

// export {SubTab, HeaderTab }

export default HeaderTab;
