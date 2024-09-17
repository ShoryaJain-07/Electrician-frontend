import axios from 'axios';
import React, { useState } from 'react'
import { URL } from '../../constant/constant';
import { useNavigate } from 'react-router-dom';

const AddEl = () => {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () =>{
        axios.post(`${URL}/admin/add-electrician`,{
            name:name,
            phone:phone,
            password:password
        }).then((res)=>{
            console.log(res.data.statusCode)
            if(res.data.statusCode === 200){
                alert("Electrician Added")
            }
        })
        setName('')
        setPhone('')
        setPassword('')

        navigate("/admin/electrician");
    }

  return (
    <div className="bg-[#272727] text-white text-2xl w-full h-screen flex items-center justify-center">
      <div className="p-8 flex rounded-xl flex-col gap-6 bg-[#171717]">
        <div className="flex flex-col gap-4">
          <p>Name</p>
          <input
            type="text"
            value={name}
            className="bg-inherit rounded-lg p-2 border"
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <p>Phone</p>
          <input
            type="text"
            value={phone}
            className="bg-inherit rounded-lg p-2 border"
            onChange={(e)=>setPhone(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <p>Password</p>
          <input
            type="text"
            value={password}
            className="bg-inherit rounded-lg p-2 border"
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <div className='p-2 text-center w-full bg-blue-700 rounded-lg cursor-pointer' onClick={handleSubmit}>Submit</div>
      </div>
    </div>
  );
}

export default AddEl