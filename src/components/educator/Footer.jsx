// import React from "react";
// import { assets } from "../../assets/assets";

// const Footer = () => {
//   return (
//     <footer>
//       <div className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t ">
//         <div className="flex items-center gap-4">
//           <img className="hidden md:block w-20" src={assets.logo} alt="logo" />
//           <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
//           <p className="py-4 text-center text-xs md:text-sm text-gray-500">
//             Copyright 2024 © GreatStack. All Right Reserved.
//           </p>
//         </div>
//         <div className="flex items-center gap-3 max-md:mt-4 ">
//           <a href="#">
//             <img src={assets.facebook_icon} alt="facebook_icon" />
//           </a>
//           <a href="#">
//             <img src={assets.twitter_icon} alt="twitter_icon" />
//           </a>
//           <a href="#">
//             <img src={assets.instagram_icon} alt="instagram_icon" />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="edemy-footer-wrapper">
      <div className="edemy-footer-content">
        <div className="edemy-footer-left">
          <img className="edemy-footer-logo" src={assets.logo} alt="logo" />
          <div className="edemy-footer-divider"></div>
          <p className="edemy-footer-copyright">
            Copyright 2025 © Edemy. All Right Reserved.
          </p>
        </div>
        <div className="edemy-footer-social">
          <a href="#" className="edemy-footer-social-link">
            <img
              src={assets.facebook_icon}
              alt="facebook_icon"
              className="edemy-footer-social-icon"
            />
          </a>
          <a href="#" className="edemy-footer-social-link">
            <img
              src={assets.twitter_icon}
              alt="twitter_icon"
              className="edemy-footer-social-icon"
            />
          </a>
          <a href="#" className="edemy-footer-social-link">
            <img
              src={assets.instagram_icon}
              alt="instagram_icon"
              className="edemy-footer-social-icon"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
