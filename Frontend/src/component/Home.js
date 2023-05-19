// import React, { useEffect } from "react";
// import Navbar from "./Navbar";
// import swal from "sweetalert";
// function Home() {
//   const [books, setBooks] = React.useState([]);
//   useEffect(() => {
//     try {
//       fetch("http://localhost:3000/books")
//         .then((res) => res.json())
//         .then((res) => {
//           console.log(res);
//           setBooks(res.books);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);
//   console.log(books);

//   const UserBookAdd = (data, id) => {
//     if (localStorage.getItem("token") == null) {
//       alert("Please login first");
//       return;
//     }

//     try {
//       fetch("http://localhost:3000/userbook", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Allow-Cross-Origin": "*",
//         },
//         body: JSON.stringify({
//           id: id,
//           BookName: data.BookName,
//           AuthorName: data.AuthorName,
//           type: data.type,
//           Price: data.Price,
//         }),
//       })
//         .then((res) => res.json())
//         .then((res) => {
//           if (res.error) {
//             swal({
//               title: "Error",
//               text: res.error,
//               icon: "error",
//               button: "ok",
//             });
//           } else {
//             swal({
//               title: "Success",
//               text: res.message,
//               icon: "success",
//               button: "ok",
//             }).then((responce) => {
//               window.location.href = "/user";
//             });
//           }
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="flex my-12 justify-center">
//         <div className="w-full sm:w-11/12 lg:w-3/4">
//           <div className="overflow-x-auto">
//             <table className="w-full table-auto">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-2 bg-gray-200">Name</th>
//                   <th className="px-4 py-2 bg-gray-200">Author</th>
//                   <th className="px-4 py-2 bg-gray-200">Type</th>
//                   <th className="px-4 py-2 bg-gray-200">Price</th>
//                   <th className="px-4 py-2 bg-gray-200">Request</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {books.map((book, index) => (
//                   <tr key={index}>
//                     <td className="px-2 py-2 sm:px-4">{book.BookName}</td>
//                     <td className="px-2 py-2 sm:px-4">{book.AuthorName}</td>
//                     <td className="px-2 py-2 sm:px-4">{book.type}</td>
//                     <td className="px-2 py-2 sm:px-4">{book.Price}</td>
//                     <td className="px-2 py-2 sm:px-4">
//                       <button
//                         className="bg-green-500  -mr-12 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm sm:py-2 sm:px-4"
//                         onClick={() => {
//                           const id = localStorage.getItem("id");
//                           UserBookAdd(book, id);
//                         }}
//                       >
//                         Request
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

import React, { useEffect } from "react";
import Navbar from "./Navbar";
import swal from "sweetalert";

function Home() {
  const [books, setBooks] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  useEffect(() => {
    try {
      let url = "http://localhost:3000/books";
      if (searchQuery) {
        url += `?search=${searchQuery}`;
      }
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setBooks(res.books);
        });
    } catch (error) {
      console.log(error);
    }
  }, [searchQuery]);

  const UserBookAdd = (data, id) => {
    if (localStorage.getItem("token") == null) {
      alert("Please login first");
      return;
    }

    try {
      fetch("http://localhost:3000/userbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Allow-Cross-Origin": "*",
        },
        body: JSON.stringify({
          id: id,
          BookName: data.BookName,
          AuthorName: data.AuthorName,
          type: data.type,
          Price: data.Price,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            swal({
              title: "Error",
              text: res.error,
              icon: "error",
              button: "ok",
            });
          } else {
            swal({
              title: "Success",
              text: res.message,
              icon: "success",
              button: "ok",
            }).then((responce) => {
              window.location.href = "/user";
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <Navbar />

      <div className="flex my-12 justify-center">
        <div className="w-full sm:w-11/12 lg:w-3/4">
          <div className=" my-12 justify-between items-center">
            <div className="w-1/4">
              <input
                type="text"
                className="border border-gray-300 rounded px-4 py-2 w-full"
                placeholder="Search books"
                value={searchQuery}
                onChange={handleSearch}
              />
              {/* add serch icon here */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 absolute right-3 top-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 15l-3-3m0 0l-3-3m3 3l3-3m-3 3l3 3M4 4l7.5 7.5M4 4l7.5 7.5"
                />
              </svg>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-gray-200">Name</th>
                  <th className="px-4 py-2 bg-gray-200">Author</th>
                  <th className="px-4 py-2 bg-gray-200">Type</th>
                  <th className="px-4 py-2 bg-gray-200">Price</th>
                  <th className="px-4 py-2 bg-gray-200">Request</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={index}>
                    <td className="px-2 py-2 sm:px-4">{book.BookName}</td>
                    <td className="px-2 py-2 sm:px-4">{book.AuthorName}</td>
                    <td className="px-2 py-2 sm:px-4">{book.type}</td>
                    <td className="px-2 py-2 sm:px-4">{book.Price}</td>
                    <td className="px-2 py-2 sm:px-4">
                      <button
                        className="bg-green-500  -mr-12 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm sm:py-2 sm:px-4"
                        onClick={() => {
                          const id = localStorage.getItem("id");
                          UserBookAdd(book, id);
                        }}
                      >
                        Request
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
