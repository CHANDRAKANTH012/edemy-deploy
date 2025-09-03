// import React from "react";
// import { assets } from "../../assets/assets";

// const Companies = () => {
//   return (
//     <div className="pt-16">
//       <p className="text-base text-gray-500">Trusted by learners from</p>
//       <div className="flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5">
//         <img
//           src={assets.microsoft_logo}
//           alt="Microsoft"
//           className="w-20 md:w-28"
//         />
//         <img src={assets.walmart_logo} alt="Walmart" className="w-20 md:w-28" />
//         <img
//           src={assets.accenture_logo}
//           alt="Accenture"
//           className="w-20 md:w-28"
//         />
//         <img src={assets.adobe_logo} alt="Adobe" className="w-20 md:w-28" />
//         <img src={assets.paypal_logo} alt="Paypal" className="w-20 md:w-28" />
//       </div>
//     </div>
//   );
// };

// export default Companies;


import React from "react";
import { assets } from "../../assets/assets";
import "./Companies.css";

const Companies = () => {
  return (
    <div className="companies-container">
      <p className="companies-text">Trusted by learners from</p>
      <div className="companies-logos">
        <img
          src={assets.microsoft_logo}
          alt="Microsoft"
          className="company-logo"
        />
        <img 
          src={assets.walmart_logo} 
          alt="Walmart" 
          className="company-logo" 
        />
        <img
          src={assets.accenture_logo}
          alt="Accenture"
          className="company-logo"
        />
        <img 
          src={assets.adobe_logo} 
          alt="Adobe" 
          className="company-logo" 
        />
        <img 
          src={assets.paypal_logo} 
          alt="Paypal" 
          className="company-logo" 
        />
      </div>
    </div>
  );
};

export default Companies;