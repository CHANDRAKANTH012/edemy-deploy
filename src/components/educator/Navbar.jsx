// import React from 'react'
// import { assets, dummyEducatorData } from '../../assets/assets'
// import { UserButton, useUser } from "@clerk/clerk-react";
// import { Link } from 'react-router-dom';

// const Navbar = () => {

//   const educatorData = dummyEducatorData;
//   const {user} = useUser()

//   return (
//     <div className='flex items-center justify-between'>
//       <Link to='/' >
//         <img src={assets.logo} alt="logo" className='w-28 lg:w-32'/>
//       </Link>

//       <div className='flex items-center gap-5 text-gray-500 relative'>
//         <p>Hi ! {user ? user.fullName : "Developers"}</p>
//         {user ? <UserButton/> : <img src={assets.profile_img} alt="" />}
//       </div>
//     </div>
//   )
// }

// export default Navbar

import React from "react";
import { assets, dummyEducatorData } from "../../assets/assets";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const educatorData = dummyEducatorData;
  const { user } = useUser();

  return (
    <div className="edemy-navbar-wrapper">
      <Link to="/" className="edemy-navbar-logo-link">
        <img src={assets.logo} alt="logo" className="edemy-navbar-logo" />
      </Link>

      <div className="edemy-navbar-user-section">
        <p className="edemy-navbar-greeting">
          Hi! {user ? user.fullName : "Developers"}
        </p>
        {user ? (
          <UserButton />
        ) : (
          <img
            src={assets.profile_img}
            alt=""
            className="edemy-navbar-profile-img"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
