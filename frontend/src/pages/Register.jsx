import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

export default function Register() {
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const aadhaar = formData.get("aadhaar");
    const password = formData.get("password");

    try {
      const res = await axios.post(`${baseURL}/api/v1/user/register`, {
        name,
        aadhaar,
        email,
        password,
      });
      const token = res.data.token;
      localStorage.setItem("token", token);
      if (res.status === 201 && token) {
        navigate("/dashboard", {
          state: res.data?.message || "user registered succesfully",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-8 rounded-lg shadow w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="w-full p-2 border mb-4 rounded"
          required
          autoComplete="off"
        />

        <input
          type="text"
          name="email"
          placeholder="johndoe@gmail.com"
          className="w-full p-2 border mb-4 rounded"
          required
          autoComplete="off"
        />

        <input
          type="password"
          name="password"
          placeholder="******"
          className="w-full p-2 border mb-4 rounded"
          required
          autoComplete="off"
        />

        <input
          type="number"
          name="aadhaar"
          placeholder="Enter your aadhar number"
          className="w-full p-2 border mb-4 rounded"
          required
          autoComplete="off"
        />

        <button className="w-full bg-black text-white py-2 rounded cursor-pointer">
          Register
        </button>

        <div>
          Already have an account?{" "}
          <Link className="text-blue-500 mt-3" to={"/"}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
