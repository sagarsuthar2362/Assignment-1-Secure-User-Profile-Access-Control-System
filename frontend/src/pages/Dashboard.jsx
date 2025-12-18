import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [aadhaar, setAadhaar] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    async function fetchUserProfile() {
      try {
        const res = await axios.get(`${baseURL}/api/v1/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user)
        setAadhaar(res.data.aadhaar)
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserProfile();
  }, []);

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>

        <p>
          <b>Name:</b> {user.name}
        </p>
        <p>
          <b>Email:</b> {user.email}
        </p>
        <p className="mt-2 text-red-600">
          <b>Aadhaar:</b> {aadhaar}
        </p>

        <button
          className="mt-6 w-full bg-red-500 text-white py-2 rounded"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
