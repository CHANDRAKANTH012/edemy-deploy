// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../../context/AppContext";
// import Loading from "../../components/student/Loading";

// const MyCourses = () => {
//   const { allCourses } = useContext(AppContext);

//   const [courses, setCourses] = useState(null);
//   const fetchEducatorCourses = async () => {
//     setCourses(allCourses);
//   };

//   useEffect(() => {
//     fetchEducatorCourses();
//   }, [courses]);

//   return courses ? (
//     <div className="h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
//       <div className="w-full">
//         <h2 className="pb-4 text-lg font-medium">My Courses</h2>
//         <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
//           <table className="md:table-auto table-fixed w-full overflow-hidden">
//             <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
//               <tr>
//                 <th className="px-4 py-3 font-semibold truncate">
//                   All Courses
//                 </th>
//                 <th className="px-4 py-3 font-semibold truncate">Earnings</th>
//                 <th className="px-4 py-3 font-semibold truncate">Students</th>
//                 <th className="px-4 py-3 font-semibold truncate">
//                   Published On
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="text-sm text-gray-500">
//               {courses.map((course) => (
//                 <tr key={course._id} className="border-b border-gray-500/20">
//                   {/* Course Thumbnail + Title */}
//                   <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
//                     <img
//                       src={course.courseThumbnail}
//                       alt="Course Image"
//                       className="w-16"
//                     />
//                     <span className="truncate hidden md:block">
//                       {course.courseTitle}
//                     </span>
//                   </td>

//                   {/* Earnings */}
//                   <td className="px-4 py-3">
//                     $
//                     {Math.floor(
//                       course.enrolledStudents.length *
//                         (course.coursePrice -
//                           course.discount * course.coursePrice /
//                           100)
//                     )}
//                   </td>

//                   {/* Students Count */}
//                   <td className="px-4 py-3">
//                     {course.enrolledStudents.length}
//                   </td>

//                   {/* Published Date */}
//                   <td className="px-4 py-3">{new Date(course.createdAt).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <Loading />
//   );
// };

// export default MyCourses;


import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import "./MyCourses.css"; // Import the CSS file

const MyCourses = () => {
  const { allCourses } = useContext(AppContext);

  const [courses, setCourses] = useState(null);
  const fetchEducatorCourses = async () => {
    setCourses(allCourses);
  };

  useEffect(() => {
    fetchEducatorCourses();
  }, [courses]);

  return courses ? (
    <div className="my-courses-page-container">
      <div className="my-courses-page-content">
        <h2 className="my-courses-page-title">My Courses</h2>
        <div className="my-courses-wrapper-container">
          <table className="my-courses-data-table">
            <thead>
              <tr>
                <th>All Courses</th>
                <th>Earnings</th>
                <th>Students</th>
                <th>Published On</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  {/* Course Thumbnail + Title */}
                  <td className="my-courses-thumbnail-cell">
                    <img
                      src={course.courseThumbnail}
                      alt="Course Image"
                      className="my-courses-thumbnail-img"
                    />
                    <span className="my-courses-title-text">
                      {course.courseTitle}
                    </span>
                  </td>

                  {/* Earnings */}
                  <td>
                    $
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice -
                          course.discount * course.coursePrice /
                          100)
                    )}
                  </td>

                  {/* Students Count */}
                  <td>
                    {course.enrolledStudents.length}
                  </td>

                  {/* Published Date */}
                  <td>{new Date(course.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;