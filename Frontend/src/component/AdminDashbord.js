import React, { useState, useEffect } from "react";
import Dnavbar from "./Dnavbar";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import swal from "sweetalert";
function AdminDashbord() {
  const nevigate = useNavigate();
  const [islogin, setIslogin] = useState(false);
  const [books, setBooks] = useState([]);
  const [name, setName] = useState("");

  const user = localStorage.getItem("token");
  const handleclick = (id) => {
    nevigate(`/edit/${id}`);
  };

  useEffect(() => {
    if (user) {
      setIslogin(true);
    } else {
      setIslogin(false);
    }
    try {
      fetch("http://localhost:3000/books")
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setBooks(res.books);
          setName(localStorage.getItem("type"));
        });
    } catch (error) {
      console.log(error);
    }
  }, [user]);
  console.log(name);
  const deletbook = (id) => {
    try {
      fetch(`http://localhost:3000/book/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
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
              window.location.href = "/admin";
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {islogin ? (
        <>
          <Dnavbar name={name.split("@")[0]} />
          <div className="flex my-12 justify-center">
            <div className="w-full sm:w-11/12 lg:w-3/4">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 bg-gray-200">Name</th>
                      <th className="px-4 py-2 bg-gray-200">Author</th>
                      <th className="px-4 py-2  bg-gray-200">Type</th>
                      <th className="px-4 py-2  bg-gray-200">Price</th>
                      <th className="px-4 py-2 bg-gray-200"> Delete </th>
                      <th className="px-4 py-2 bg-gray-200">Add</th>
                      <th className="px-4 py-2 bg-gray-200">Edit</th>
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
                            className="bg-blue-500 -mr-9 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm sm:py-2 sm:px-4"
                            onClick={() => {
                              deletbook(book._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                        <td className="px-2 py-2 sm:px-4">
                          <button className="bg-green-500 -mr-9  hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm sm:py-2 sm:px-4">
                            <Link to="/add">Add</Link>
                          </button>
                        </td>
                        <td className="px-2 py-2 sm:px-4">
                          <button
                            className="bg-green-500  -mr-9 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm sm:py-2 sm:px-4"
                            onClick={() => {
                              handleclick(book._id);
                            }}
                          >
                            Edit
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

export default AdminDashbord;
