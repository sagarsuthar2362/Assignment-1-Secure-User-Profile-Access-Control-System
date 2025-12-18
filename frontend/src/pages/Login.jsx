import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await axios.post(`${baseURL}/api/v1/user/login`, {
        email,
        password,
      });
      const token = res.data.token;
      localStorage.setItem("token", token);

      if (res.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-8 rounded-lg shadow w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          className="w-full p-2 border mb-4 rounded"
          name="email"
          placeholder="Email"
          required
        />

        <input
          type="password"
          name="password"
          className="w-full p-2 border mb-4 rounded"
          placeholder="Password"
          required
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Login
        </button>


        <div>
            Don't have an account? <Link className="text-blue-500 mt-3" to={'/register'}>Signup</Link>
        </div>
      </form>
    </div>
  );
}
