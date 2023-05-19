import React, { useState, useEffect } from "react";
import Dnavbar from "./Dnavbar";

import Navbar from "./Navbar";
function Dashbord() {
  const [islogin, setIslogin] = useState(false);
  const [books, setBooks] = useState([]);
  const [name, setName] = useState("");
  const user = localStorage.getItem("token");
  console.log(user);

  useEffect(() => {
    if (user) {
      setIslogin(true);
    } else {
      setIslogin(false);
    }
    try {
      fetch("http://localhost:3000/getuserbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Allow-Cross-Origin": "*",
        },
        body: JSON.stringify({
          id: localStorage.getItem("id"),
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("res");
          console.log(res);
          setBooks(res.userbooks);
          setName(localStorage.getItem("type"));
        });
    } catch (error) {
      console.log(error);
    }
  }, [user]);
  console.log("kkkkkkk");
  console.log(books);
  return (
    <div>
      {islogin ? (
        <>
          <Dnavbar name={name.split("@")[0]}></Dnavbar>
          <div className="flex my-12 justify-center">
            <div className="w-full sm:w-11/12 lg:w-3/4">
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
                              localStorage.getItem("token")
                                ? alert("your are book is added ")
                                : alert("Please login first");
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
        </>
      ) : (
        <div className="container mx-auto mt-12">
          <Navbar></Navbar>
          <h2 className="text-center text-green-600 text-2xl font-bold mb-6">
            Please Login
          </h2>
        </div>
      )}
    </div>
  );
}

export default Dashbord;
