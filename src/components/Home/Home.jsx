import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-[#272727] flex items-center justify-center">
      <div className="p-10 text-white font-bold text-5xl flex flex-col items-center justify-center">
        <div className="mb-10">Welcome to ElecZone</div>
        <div className="flex gap-8 text-black text-2xl font-bold">
          <div
            className="p-4 rounded-lg bg-white cursor-pointer"
            onClick={() => navigate("/admin/electrician")}
          >
            Admin
          </div>
          <div
            className="p-4 rounded-lg bg-white cursor-pointer"
            onClick={() => navigate("/electrician-login")}
          >
            Electrician
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home