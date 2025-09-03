// import React, { useEffect, useState } from "react";
// import { dummyDashboardData } from "../../assets/assets";
// import Loading from "../../components/student/Loading";
// import { assets } from "../../assets/assets";

// const Dashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const fetchDashboardData = async () => {
//     setDashboardData(dummyDashboardData);
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   return dashboardData ? (
//     <div
//       className="min-h-screen flex flex-col items-start 
//     justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0"
//     >
//       <div className="space-y-5">
//         <div className="flex flex-wrap gap-5 items-center">
//           <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
//             <img src={assets.patients_icon} alt="patients_icon" />
//             <div>
//               <p className="text-2xl font-medium text-gray-600">
//                 {dashboardData.enrolledStudentsData.length}
//               </p>
//               <p className="text-base text-gray-500">Total Enrolments</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
//             <img src={assets.appointments_icon} alt="courses" />
//             <div>
//               <p className="text-2xl font-medium text-gray-600">
//                 {dashboardData.totalCourses}
//               </p>
//               <p className="text-base text-gray-500">Total Courses</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
//             <img src={assets.earning_icon} alt="earning" />
//             <div>
//               <p className="text-2xl font-medium text-gray-600">
//                 ${dashboardData.totalEarnings}
//               </p>
//               <p className="text-base text-gray-500">Total Earnings</p>
//             </div>
//           </div>
//         </div>

//         <div>
//           <h2 className="pb-4 text-lg font-medium">Latest Enrollments</h2>
//           <div className="bg-white rounded-md flex flex-col items-center w-full overflow-hidden border border-gray-500/20 max-w-4xl">
//             <table className="table-fixed md:table-auto w-full overflow-hidden">
//               <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
//                 <tr>
//                   <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">
//                     #
//                   </th>
//                   <th className="px-4 py-3 font-semibold">Student Name</th>
//                   <th className="px-4 py-3 font-semibold">Course Title</th>
//                 </tr>
//               </thead>
//               <tbody className="text-sm text-gray-500">
//                 {dashboardData.enrolledStudentsData.map((item, index) => (
//                   <tr key={index} className="border-b border-gray-500/20">
//                     <td className="px-4 py-3 text-center hidden sm:table-cell">
//                       {index + 1}
//                     </td>

//                     {/* Student Profile (Image + Name) */}
//                     <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
//                       <img
//                         src={item.student.imageUrl}
//                         alt="Profile"
//                         className="w-9 h-9 rounded-full"
//                       />
//                       <span className="truncate">{item.student.name}</span>
//                     </td>

//                     {/* Course Title */}
//                     <td className="px-4 py-3 truncate">{item.courseTitle}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <Loading />
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import { dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import "./Dashboard.css"; // Import the CSS file

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return dashboardData ? (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="stats-container">
          <div className="stat-card">
            <img src={assets.patients_icon} alt="patients_icon" />
            <div>
              <p className="stat-number">
                {dashboardData.enrolledStudentsData.length}
              </p>
              <p className="stat-label">Total Enrolments</p>
            </div>
          </div>
          <div className="stat-card">
            <img src={assets.appointments_icon} alt="courses" />
            <div>
              <p className="stat-number">
                {dashboardData.totalCourses}
              </p>
              <p className="stat-label">Total Courses</p>
            </div>
          </div>
          <div className="stat-card">
            <img src={assets.earning_icon} alt="earning" />
            <div>
              <p className="stat-number">
                ${dashboardData.totalEarnings}
              </p>
              <p className="stat-label">Total Earnings</p>
            </div>
          </div>
        </div>

        <div className="enrollments-section">
          <h2>Latest Enrollments</h2>
          <div className="enrollments-table-container">
            <table className="enrollments-table">
              <thead className="enrollments-table-header">
                <tr>
                  <th className="enrollments-header-center">
                    #
                  </th>
                  <th className="enrollments-table-cell">Student Name</th>
                  <th className="enrollments-table-cell">Course Title</th>
                </tr>
              </thead>
              <tbody className="enrollments-table-body">
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="enrollments-table-row">
                    <td className="enrollments-cell-center">
                      {index + 1}
                    </td>

                    {/* Student Profile (Image + Name) */}
                    <td className="enrollments-student-cell">
                      <img
                        src={item.student.imageUrl}
                        alt="Profile"
                        className="enrollments-student-avatar"
                      />
                      <span className="enrollments-truncate">{item.student.name}</span>
                    </td>

                    {/* Course Title */}
                    <td className="enrollments-table-cell enrollments-truncate">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
