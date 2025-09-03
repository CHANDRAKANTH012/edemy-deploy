import React, { useEffect, useRef, useState } from "react";
import uniqid from "uniqid";
import Quill from "quill";
import { assets } from "../../assets/assets";
import "./AddCourse.css"; // Import the CSS file

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter chapter Name: ");
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopUp(true);
    } else if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = ()=>{
    setChapters(
      chapters.map((chapter)=>{
        if(chapter.chapterId === currentChapterId){
          const newLecture = {
            ...lectureDetails,lectureOrder: chapter.chapterContent.length > 0 ?
            chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
            lectureId: uniqid()
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    )

    setShowPopUp(false);
    setLectureDetails({
      lectureTitle:'',
      lectureDuration:'',
      lectureUrl:'',
      isPreviewFree: false,
    });
  };


  const handleSubmit = async(e)=>{
    e.preventDefault();
  }


  useEffect(() => {
    //initiate quill only 1 time
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <div className="add-course-container">
      <form onSubmit={handleSubmit} action="" className="add-course-form">
        <div className="form-group">
          <p>Course Title</p>
          <input
            type="text"
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            placeholder="Type here."
            className="form-input"
          />
        </div>
        <div className="form-group">
          <p>Course Description:</p>
          <div ref={editorRef}></div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <p>Course Price</p>
            <input
              type="number"
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              placeholder="0"
              className="form-input-number"
              required
            />
          </div>

          <div>
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className="file-upload-label">
              <img
                src={assets.file_upload_icon}
                alt="icon"
                className="file-upload-icon"
              />
              <input
                type="file"
                id="thumbnail"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
              <img
                src={image ? URL.createObjectURL(image) : ""}
                alt=""
                className="thumbnail-preview"
              />
            </label>
          </div>
        </div>

        <div className="form-group">
          <p>Discount %</p>
          <input
            type="number"
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            placeholder="0"
            min={0}
            max={100}
            className="form-input-number"
          />
        </div>

        {/* Adding chapter & lectures */}

        <div>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="chapter-container">
              <div className="chapter-header">
                <div className="chapter-title-container">
                  <img
                    onClick={() => handleChapter("toggle", chapter.chapterId)}
                    src={assets.dropdown_icon}
                    width={14}
                    alt=""
                    className={`dropdown-icon ${
                      chapter.collapsed && "collapsed"
                    }`}
                  />
                  <span className="chapter-title">
                    {chapterIndex + 1} {chapter.chapterTitle}
                  </span>
                </div>

                <span className="lecture-count">
                  {chapter.chapterContent.length} lectures
                </span>

                <img
                  src={assets.cross_icon}
                  alt=""
                  className="cross-icon"
                  onClick={() => handleChapter("remove", chapter.chapterId)}
                />
              </div>

              {!chapter.collapsed && (
                <div className="chapter-content">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div className="lecture-item" key={lectureIndex}>
                      <span>
                        {lectureIndex + 1} {lecture.lectureTitle} -{" "}
                        {lecture.lectureDuration} mins -{" "}
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          className="lecture-link"
                        >
                          Link
                        </a>{" "}
                        - {lecture.isPreviewFree ? "Free preview" : "Paid"}
                      </span>
                      <img
                        src={assets.cross_icon}
                        className="cross-icon"
                        alt=""
                        onClick={() =>
                          handleLecture(
                            "remove",
                            chapter.chapterId,
                            lectureIndex
                          )
                        }
                      />
                    </div>
                  ))}
                  <div
                    className="add-lecture-btn"
                    onClick={() => handleLecture("add", chapter.chapterId)}
                  >
                    + Add Lecture
                  </div>
                  {/* kelagade extra */}
                </div>
              )}
            </div>
          ))}
          <div className="add-chapter-btn" onClick={() => handleChapter("add")}>
            + Add Chapter
          </div>

          {showPopUp && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2 className="modal-title">Add Lecture</h2>

                <div className="modal-form-group">
                  <p>Lecture Title</p>
                  <input
                    type="text"
                    className="modal-input"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="modal-form-group">
                  <p>Duration (mins)</p>
                  <input
                    type="number"
                    className="modal-input"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="modal-form-group">
                  <p>Lecture URL</p>
                  <input
                    type="text"
                    className="modal-input"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="checkbox-container">
                  <p>is Preview Free?</p>
                  <input
                    type="checkbox"
                    className="modal-checkbox"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                  />
                </div>

                <button className="modal-submit-btn" type="button" onClick={addLecture}>
                  Add
                </button>
                <img
                  src={assets.cross_icon}
                  alt="cross"
                  onClick={() => setShowPopUp(false)}
                  className="modal-close-icon"
                />
              </div>
            </div>
          )}
          {/* form mele iro div idu (down-one)*/}
        </div>

        <button className="submit-btn" type="submit">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddCourse;

// import React, { useEffect, useRef, useState } from "react";
// import uniqid from "uniqid";
// import Quill from "quill";
// import { assets } from "../../assets/assets";

// const AddCourse = () => {
//   const quillRef = useRef(null);
//   const editorRef = useRef(null);

//   const [courseTitle, setCourseTitle] = useState("");
//   const [coursePrice, setCoursePrice] = useState(0);
//   const [discount, setDiscount] = useState(0);
//   const [image, setImage] = useState(null);
//   const [chapters, setChapters] = useState([]);
//   const [showPopUp, setShowPopUp] = useState(false);
//   const [currentChapterId, setCurrentChapterId] = useState(null);
//   const [lectureDetails, setLectureDetails] = useState({
//     lectureTitle: "",
//     lectureDuration: "",
//     lectureUrl: "",
//     isPreviewFree: false,
//   });

//   const handleChapter = (action, chapterId) => {
//     if (action === "add") {
//       const title = prompt("Enter chapter Name: ");
//       if (title) {
//         const newChapter = {
//           chapterId: uniqid(),
//           chapterTitle: title,
//           chapterContent: [],
//           collapsed: false,
//           chapterOrder:
//             chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
//         };
//         setChapters([...chapters, newChapter]);
//       }
//     } else if (action === "remove") {
//       setChapters(
//         chapters.filter((chapter) => chapter.chapterId !== chapterId)
//       );
//     } else if (action === "toggle") {
//       setChapters(
//         chapters.map((chapter) =>
//           chapter.chapterId === chapterId
//             ? { ...chapter, collapsed: !chapter.collapsed }
//             : chapter
//         )
//       );
//     }
//   };

//   const handleLecture = (action, chapterId, lectureIndex) => {
//     if (action === "add") {
//       setCurrentChapterId(chapterId);
//       setShowPopUp(true);
//     } else if (action === "remove") {
//       setChapters(
//         chapters.map((chapter) => {
//           if (chapter.chapterId === chapterId) {
//             chapter.chapterContent.splice(lectureIndex, 1);
//           }
//           return chapter;
//         })
//       );
//     }
//   };

//   const addLecture = () => {
//     if (currentChapterId && lectureDetails.lectureTitle) {
//       const newLecture = {
//         lectureId: uniqid(),
//         ...lectureDetails,
//       };

//       setChapters(
//         chapters.map((chapter) =>
//           chapter.chapterId === currentChapterId
//             ? {
//                 ...chapter,
//                 chapterContent: [...chapter.chapterContent, newLecture],
//               }
//             : chapter
//         )
//       );

//       // Reset form and close popup
//       setLectureDetails({
//         lectureTitle: "",
//         lectureDuration: "",
//         lectureUrl: "",
//         isPreviewFree: false,
//       });
//       setShowPopUp(false);
//       setCurrentChapterId(null);
//     }
//   };

//   useEffect(() => {
//     //initiate quill only 1 time
//     if (!quillRef.current && editorRef.current) {
//       quillRef.current = new Quill(editorRef.current, { theme: "snow" });
//     }
//   }, []);

//   return (
//     <div className="h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
//       <div className="flex flex-col gap-1">
//         <form
//           action=""
//           className="flex flex-col gap-4 max-w-md w-full text-gray-500"
//         >
//           <p>Course Title</p>
//           <input
//             type="text"
//             onChange={(e) => setCourseTitle(e.target.value)}
//             value={courseTitle}
//             placeholder="Type here."
//             className="outline-none md:py-2.5 py-2 px-3
//             rounded border border-gray-500"
//           />
//           <div className="flex flex-col gap-1">
//             <p>Course Description:</p>
//             <div ref={editorRef}></div>
//           </div>

//           <div className="flex items-center justify-between flex-wrap">
//             <div className="flex flex-col gap-1">
//               <p>Course Price</p>
//               <input
//                 type="number"
//                 onChange={(e) => setCoursePrice(e.target.value)}
//                 value={coursePrice}
//                 placeholder="0"
//                 className="outline-none rounded md:py-2.5 py-2 w-28 px-3 border border-gray-500"
//                 required
//               />
//             </div>

//             <div>
//               <p>Course Thumbnail</p>
//               <label
//                 htmlFor="thumbnail"
//                 className='flex items-center gap-3'
//               >
//                 <img
//                   src={assets.file_upload_icon}
//                   alt="icon"
//                   className="p-3 bg-blue-500 rounded cursor-pointer"
//                 />
//                 <input
//                   type="file"
//                   id="thumbnail"
//                   onChange={(e) => setImage(e.target.files[0])}
//                   accept="image/*"
//                   hidden
//                 />
//                 {image && (
//                   <img
//                     src={URL.createObjectURL(image)}
//                     alt=""
//                     className="max-h-10"
//                   />
//                 )}
//               </label>
//             </div>

//             <div className="flex flex-col gap-1">
//               <p>Discount %</p>
//               <input
//                 type="number"
//                 onChange={(e) => setDiscount(e.target.value)}
//                 value={discount}
//                 placeholder="0"
//                 min={0}
//                 max={100}
//                 className="md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
//               />
//             </div>
//           </div>

//           <div>
//             {chapters.map((chapter, chapterIndex) => (
//               <div
//                 key={chapter.chapterId}
//                 className="bg-white border rounded-lg mb-4"
//               >
//                 <div className="flex items-center justify-between p-4 border-b">
//                   <div className="flex items-center">
//                     <img
//                       src={assets.dropdown_icon}
//                       width={14}
//                       alt=""
//                       className={`mr-2 cursor-pointer transition-all ${
//                         chapter.collapsed && "-rotate-90"
//                       }`}
//                       onClick={() => handleChapter("toggle", chapter.chapterId)}
//                     />
//                     <span className="font-semibold">
//                       {chapterIndex + 1} {chapter.chapterTitle}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="text-gray-500">
//                       {chapter.chapterContent.length} lectures
//                     </span>
//                     <img
//                       src={assets.cross_icon}
//                       alt=""
//                       className="cursor-pointer"
//                       onClick={() => handleChapter("remove", chapter.chapterId)}
//                     />
//                   </div>
//                 </div>
//                 {!chapter.collapsed && (
//                   <div className="p-4">
//                     {chapter.chapterContent.map((lecture, lectureIndex) => (
//                       <div
//                         className="flex justify-between items-center mb-2"
//                         key={lecture.lectureId || lectureIndex}
//                       >
//                         <span>
//                           {lectureIndex + 1} {lecture.lectureTitle} -{" "}
//                           {lecture.lectureDuration} mins -{" "}
//                           <a
//                             href={lecture.lectureUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-500"
//                           >
//                             Link
//                           </a>{" "}
//                           - {lecture.isPreviewFree ? "Free preview" : "Paid"}
//                         </span>
//                         <img
//                           src={assets.cross_icon}
//                           className="cursor-pointer"
//                           alt=""
//                           onClick={()=>handleLecture('remove',chapter.chapterId,lectureIndex)}
//                         />
//                       </div>
//                     ))}
//                     <div
//                       className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2"
//                       onClick={()=>handleLecture('add',chapter.chapterId)}
//                     >
//                       + Add Lecture
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//             <div
//               className="flex items-center justify-between bg-blue-100 p-2 rounded-lg cursor-pointer"
//               onClick={() => handleChapter("add")}
//             >
//               + Add Chapter
//             </div>
//           </div>

//           <button
//             className="bg-black text-white w-max py-2.5 px-8 my-4 rounded"
//             type="submit"
//           >
//             ADD
//           </button>
//         </form>
//       </div>

//       {showPopUp && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//           <div className="bg-white text-gray-700 p-4 rounded relative w-full max-w-80">
//             <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>

//             <div className="mb-2">
//               <p>Lecture Title</p>
//               <input
//                 type="text"
//                 className="mt-1 block w-full border rounded py-1 px-2"
//                 value={lectureDetails.lectureTitle}
//                 onChange={(e) =>
//                   setLectureDetails({
//                     ...lectureDetails,
//                     lectureTitle: e.target.value,
//                   })
//                 }
//               />
//             </div>

//             <div className="mb-2">
//               <p>Duration (mins)</p>
//               <input
//                 type="number"
//                 className="mt-1 block w-full border rounded py-1 px-2"
//                 value={lectureDetails.lectureDuration}
//                 onChange={(e) =>
//                   setLectureDetails({
//                     ...lectureDetails,
//                     lectureDuration: e.target.value,
//                   })
//                 }
//               />
//             </div>

//             <div className="mb-2">
//               <p>Lecture URL</p>
//               <input
//                 type="text"
//                 className="mt-1 block w-full border rounded py-1 px-2"
//                 value={lectureDetails.lectureUrl}
//                 onChange={(e) =>
//                   setLectureDetails({
//                     ...lectureDetails,
//                     lectureUrl: e.target.value,
//                   })
//                 }
//               />
//             </div>

//             <div className="flex gap-2 my-4">
//               <p>is Preview Free?</p>
//               <input
//                 type="checkbox"
//                 className="mt-1 scale-125"
//                 checked={lectureDetails.isPreviewFree}
//                 onChange={(e) =>
//                   setLectureDetails({
//                     ...lectureDetails,
//                     isPreviewFree: e.target.checked,
//                   })
//                 }
//               />
//             </div>

//             <button
//               className="w-full bg-blue-400 text-white px-4 rounded py-2"
//               type="button"
//               onClick={addLecture}
//             >
//               Add
//             </button>
//             <img
//               src={assets.cross_icon}
//               alt="cross"
//               onClick={() => setShowPopUp(false)}
//               className="absolute top-4 cursor-pointer right-4 w-4"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddCourse;
