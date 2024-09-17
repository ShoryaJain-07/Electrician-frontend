import axios from "axios";
import React, { useState } from "react";
import { URL } from "../../constant/constant";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");



    const handleSubmit =()=>{
        axios.get(`${URL}/admin/login-electrician?phone=${phone}&password=${password}`).then((res)=>{
            console.log(res.data)
            if(res.data.statusCode === 200){
                localStorage.setItem("id",res.data.data._id)
                navigate("/electrician")
            } else {
                alert("incorrect password or phone number")
            }
        })
        setPhone("")
        setPassword("")
    }

  return (
    <div className="bg-[#272727] text-white text-2xl w-full h-screen flex items-center justify-center">
      <div className="p-8 flex rounded-xl flex-col gap-6 bg-[#171717]">
        <div className="flex flex-col gap-4">
          <p>Phone</p>
          <input
            type="text"
            value={phone}
            className="bg-inherit rounded-lg p-2 border"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <p>Password</p>
          <input
            type="text"
            value={password}
            className="bg-inherit rounded-lg p-2 border"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          className="p-2 text-center w-full bg-blue-700 rounded-lg cursor-pointer"
          onClick={handleSubmit}
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default Login;
