// import React from "react";
// import { assets } from "../../assets/assets";

// const SearchBar = () => {
//   return (
//     <form className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded">
//       <img
//         src={assets.search_icon}
//         alt="search_icon"
//         className="md:w-auto w-10 px-3"
//       />
//       <input
//         type="text"
//         placeholder="Search for courses"
//         className="w-full h-full outline-none text-gray-500/80"
//       />
//       <button
//         type="submit"
//         className="bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1"
//       >
//         search
//       </button>
//     </form>
//   );
// };

// export default SearchBar;

import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { assets } from "../../assets/assets";
import "./SearchBar.css";

const SearchBar = ({data}) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");

  const onSearchHandler = (e) => {
    e.preventDefault(); //prevents page-reload
    navigate("/course-list/" + input);
  };

  return (
    <form onSubmit={onSearchHandler} className="search-form">
      <img src={assets.search_icon} alt="search_icon" className="search-icon" />
      <input
        onChange={(e) => {
          console.log(e.target.value);
          
          setInput(e.target.value)}}
        value={input}
        type="text"
        placeholder="Search for courses"
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
