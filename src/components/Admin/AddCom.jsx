import axios from "axios";
import React, { useState } from "react";
import { URL } from "../../constant/constant";
import { useNavigate } from "react-router-dom";

const AddCom = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = () => {
    axios
      .post(`${URL}/admin/add-complaint`, {
        category: category,
        description: description,
        name: name,
        address: address,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.statusCode === 200) {
          alert("Complaint Added");
        }
      });
    setCategory("");
    setDescription("");
    setName("");
    setAddress("");

    navigate("/admin/complaint");
  };

  return (
    <div className="bg-[#272727] text-white text-2xl w-full h-screen flex items-center justify-center">
      <div className="p-8 flex rounded-xl flex-col gap-6 bg-[#171717]">
        <div className="flex flex-col gap-4">
          <p>Category</p>
          <input
            type="text"
            value={category}
            className="bg-inherit rounded-lg p-2 border"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <p>Description</p>
          <input
            type="text"
            value={description}
            className="bg-inherit rounded-lg p-2 border"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <p>Name</p>
          <input
            type="text"
            value={name}
            className="bg-inherit rounded-lg p-2 border"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <p>Address</p>
          <input
            type="text"
            value={address}
            className="bg-inherit rounded-lg p-2 border"
            onChange={(e) => setAddress(e.target.value)}
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

export default AddCom;
