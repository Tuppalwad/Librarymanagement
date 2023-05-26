import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import swal from "sweetalert";

function Home() {
  const [books, setBooks] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    try {
      fetch("http://localhost:3000/books")
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setBooks(res.books);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(searchTerm);
  const handleSearch = async () => {
    try {
      const response = await fetch("http://localhost:3000/search-books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item: searchTerm }),
      });

      const data = await response.json();
      setSearchResults(data.books);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };
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

  return (
    <div>
      <Navbar />

      <div className="flex my-12 justify-center">
        <div className="w-full sm:w-11/12 lg:w-3/4">
          <div className=" flex my-12 justify-start items-center">
            <div className="w-1/4">
              <input
                type="text"
                className="border border-gray-300 rounded px-4 py-2 w-full"
                placeholder="Search books"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="ml-3">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSearch}
              >
                Search
              </button>
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
                {searchTerm.length > 0
                  ? searchResults.map((book, index) => (
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
                    ))
                  : books.map((book, index) => (
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
