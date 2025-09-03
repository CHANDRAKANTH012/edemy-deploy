// import React, { useContext } from "react";
// import { AppContext } from "../../context/AppContext";
// import { useState } from "react";
// import { Line } from "rc-progress";

// const MyEnrollments = () => {
//   const { enrolledCourses, calculateCourseDuration, navigate } =
//     useContext(AppContext);
//   const [progressArray, setProgressArray] = useState([
//     { lectureCompleted: 2, totalLectures: 4 },
//     { lectureCompleted: 3, totalLectures: 4 },
//     { lectureCompleted: 2, totalLectures: 4 },
//     { lectureCompleted: 4, totalLectures: 4 },
//     { lectureCompleted: 1, totalLectures: 4 },
//     { lectureCompleted: 4, totalLectures: 4 },
//     { lectureCompleted: 2, totalLectures: 4 },
//     { lectureCompleted: 4, totalLectures: 4 },
//   ]);

//   return (
//     <>
//       <div className="md:px-36 px-8 pt-10">
//         <h1 className="text-2xl font-semibold">My Enrollments</h1>
//         <table className="md:table-auto table-fixed w-full overflow-hidden border mt-10">
//           <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
//             <tr>
//               <th className="px-4 py-3 font-semibold truncate">Course</th>
//               <th className="px-4 py-3 font-semibold truncate">Duration</th>
//               <th className="px-4 py-3 font-semibold truncate">Completed</th>
//               <th className="px-4 py-3 font-semibold truncate">Status</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {enrolledCourses.map((course, index) => (
//               <tr key={index} className="border-b border-gray-500/20">
//                 <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
//                   <img
//                     src={course.courseThumbnail}
//                     alt=""
//                     className="w-14 sm:w-24 md:w-28"
//                   />
//                   <div className="flex-1">
//                     <p className="mb-1 max-sm:text-sm">{course.courseTitle}</p>
//                     <Line
//                       strokeWidth={1}
//                       percent={
//                         progressArray[index]
//                           ? (progressArray[index].lectureCompleted * 100) /
//                             progressArray[index].totalLectures
//                           : 0
//                       }
//                       className="bg-gray-300 rounded-full "
//                     />
//                   </div>
//                 </td>
//                 <td className="px-4 py-3 max-sm:hidden">
//                   {calculateCourseDuration(course)}
//                 </td>
//                 <td className="px-4 py-3 max-sm:hidden">
//                   {progressArray[index] &&
//                     `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}`}{" "}
//                   <span>Lectures</span>
//                 </td>
//                 <td className="px-4 py-3 max-sm:text-right">
//                   <button
//                     onClick={() => navigate("/player/" + course._id)}
//                     className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white"
//                   >
//                     {progressArray[index] &&
//                     progressArray[index].lectureCompleted /
//                       progressArray[index].totalLectures ===
//                       1
//                       ? "Completed"
//                       : "Ongoing"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default MyEnrollments;

import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "./MyEnrollments.css";
import Footer from "../../components/student/Footer";

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, navigate } =
    useContext(AppContext);

  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 5 },
    { lectureCompleted: 3, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 3 },
    { lectureCompleted: 5, totalLectures: 7 },
    { lectureCompleted: 1, totalLectures: 7 },
    { lectureCompleted: 3, totalLectures: 9 },
  ]);

  const getProgressPercentage = (completed, total) => {
    return (completed / total) * 100;
  };

  const isCompleted = (completed, total) => {
    return completed === total;
  };

  return (
    <>
    <div className="my-enrollments-wrapper">
      <h1 className="my-enrollments-title">My Enrollments</h1>

      <table className="my-enrollments-table">
        <thead className="my-enrollments-table-header">
          <tr>
            <th>Course</th>
            <th>Duration</th>
            <th>Completed</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {enrolledCourses.map((course, index) => (
            <tr key={index} className="my-enrollments-table-row">
              <td className="my-enrollments-course-cell">
                <img
                  src={course.courseThumbnail}
                  alt={course.courseTitle}
                  className="my-enrollments-course-thumbnail"
                />
                <div className="my-enrollments-course-info">
                  <p className="my-enrollments-course-title">
                    {course.courseTitle}
                  </p>
                  <div className="my-enrollments-progress-container">
                    <div
                      className="my-enrollments-progress-bar"
                      style={{
                        width: `${
                          progressArray[index]
                            ? getProgressPercentage(
                                progressArray[index].lectureCompleted,
                                progressArray[index].totalLectures
                              )
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </td>

              <td className="my-enrollments-duration-cell">
                {calculateCourseDuration(course)}
              </td>

              <td className="my-enrollments-completed-cell">
                {progressArray[index] &&
                  `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}`}{" "}
                Lectures
              </td>

              <td className="my-enrollments-status-cell">
                <button
                  onClick={() => navigate("/player/" + course._id)}
                  className={`my-enrollments-status-button ${
                    progressArray[index] &&
                    isCompleted(
                      progressArray[index].lectureCompleted,
                      progressArray[index].totalLectures
                    )
                      ? "my-enrollments-status-completed"
                      : "my-enrollments-status-ongoing"
                  }`}
                >
                  {progressArray[index] &&
                  isCompleted(
                    progressArray[index].lectureCompleted,
                    progressArray[index].totalLectures
                  )
                    ? "Completed"
                    : "On Going"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </>
  );
};

export default MyEnrollments;
