import React from "react";
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { Email, Password };
    console.log(user);
    fetch("http://localhost:3000/login", {
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
          // store token in local storage
          localStorage.setItem("token", res.token);
          localStorage.setItem("type", res.users);
          localStorage.setItem("id", res.id);
          swal({
            title: "Success",
            text: res.message,
            icon: "success",
            button: "ok",
          }).then((responce) => {
            if (res.type === "admin") {
              navigate("/admin");
            }
            if (res.type === "user") {
              navigate("/user");
            }
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
          Login Form
        </h2>
        <form onSubmit={handleSubmit} method="post" className="w-64 mx-auto">
          <div className="mb-4">
            <label htmlFor="uname" className="block mb-1">
              <b>Username</b>
            </label>
            <input
              type="email"
              placeholder="Enter Username"
              name="uname"
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

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-900"
          >
            <Link to="/login">Login</Link>
          </button>

          {/* i dont have an account her  */}
          <div className="container signin">
            <p>
              Dont have an account?
              <Link to="/Register " className="ml-2 text-green-800 ">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
