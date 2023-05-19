import React, { useState } from "react";
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";
import swal from "sweetalert";
const Register = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { Email, Password, type };
    console.log(user);
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Allow-Cross-Origin": "*",
      },
      body: JSON.stringify(user),
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
          });
        }
      });
    e.target.reset();
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="container mx-auto mt-12">
        <h2 className="text-center text-green-600 text-2xl font-bold mb-6">
          Registration Form
        </h2>
        <form onSubmit={handleSubmit} method="post" className="w-64 mx-auto">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="psw" className="block mb-1">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* type of user is ther admi n or user
           */}
          <div className="mb-4">
            <label htmlFor="psw" className="block mb-1">
              <b>Type</b>
            </label>
            {/* user redio button for user and admin  */}
            <input
              type="radio"
              name="type"
              value="user"
              onChange={(e) => setType(e.target.value)}
            />{" "}
            user
            <input
              className="ml-2"
              type="radio"
              name="type"
              value="admin"
              onChange={(e) => setType(e.target.value)}
            />{" "}
            admin
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            <Link to="/login">Register</Link>
          </button>
          <div className="container signin">
            <p>
              Already have an account?
              <Link to="/login " className="ml-2 text-green-800 ">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
