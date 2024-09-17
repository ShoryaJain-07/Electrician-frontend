import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {URL} from "../../constant/constant.js"

const AdHome = () => {
  const navigate = useNavigate();
  const [electricians, setElectricians] = useState(null)
  const [openComplaint, setOpenComplaint] = useState([]);
  const [closedComplaint, setClosedComplaint] = useState([]);
  const [view, setView] = useState(false)

  const getElec=()=>{
    axios.get(`${URL}/admin/get-electricians`).then((res)=>{
      setElectricians(res.data.data);
    });
  }

useEffect(()=>{
    getElec()
},[])

const handleDel = (id)=>{
  axios.delete(`${URL}/admin/delete-electrician?electricianId=${id}`).then((res)=>{
    alert("Electrician deleted")
  }).catch(err=>{
    console.log(err)
  })
}

const handleClick =(id)=>{
     setView(true)
      axios
        .get(`${URL}/electrician/get-complaints?electricianId=${id}`)
        .then((res) => {setClosedComplaint(res.data.data.closedComplaints); setOpenComplaint(res.data.data.openComplaints)});

}

  return (
    <div className="flex text-white bg-[#272727] w-full min-h-screen">
      <div className="p-8 w-[20%] bg-[#171717]">
        <div className="text-5xl font-bold mb-12">ElecZone</div>
        <div className="text-2xl flex flex-col gap-6">
          <div className="rounded-lg bg-[#303030] cursor-pointer p-4">
            Electrician
          </div>
          <div
            className="p-4 hover:bg-[#303030] cursor-pointer rounded-lg"
            onClick={() => navigate("/admin/complaint")}
          >
            Complaints
          </div>
        </div>
      </div>

      <div className="w-[80%] p-20">
        <div className="w-full flex justify-end text-xl text-white mb-6">
          <div
            className="py-3 px-8 rounded-lg bg-blue-700 cursor-pointer"
            onClick={() => navigate("/admin/addel")}
          >
            Add Electrician
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-6 mb-12">
          {electricians &&
            electricians.map((el) => (
              <div
                className="p-6 cursor-pointer flex justify-between items-center text-white rounded-lg bg-[#171717]"
                onClick={() => handleClick(el._id)}
              >
                <div className="">
                  <div className="text-xl font-bold">Name : {el.name}</div>
                  <div>Status : {el.status}</div>
                  <div>Phone : {el.phone}</div>
                </div>
                <div
                  className="cursor-pointer rounded-lg bg-red-600 p-2"
                  onClick={() => handleDel(el._id)}
                >
                  Delete
                </div>
              </div>
            ))}
        </div>
        <div className="w-full flex">
          <div className="w-1/2 p-4">
            {view && (
              <div className="mb-4 text-3xl font-bold">Open Complaints</div>
            )}
            {openComplaint &&
              openComplaint.map((c) => (
                <div className="w-full p-2 rounded-xl bg-[#171717] my-4">
                  <div>Category : {c.category}</div>
                  <div>Description : {c.description}</div>
                  <div>Name : {c.name}</div>
                  <div>Address : {c.address}</div>
                </div>
              ))}
            {view && !openComplaint.length && <div>No Open Complaints</div>}
          </div>
          <div className="w-1/2 p-4">
            {view && (
              <div className="mb-4 text-3xl font-bold">Closed Complaints</div>
            )}
            {closedComplaint &&
              closedComplaint.map((c) => (
                <div className="w-full p-2 rounded-xl bg-[#171717] my-4">
                  <div>Category : {c.category}</div>
                  <div>Description : {c.description}</div>
                  <div>Name : {c.name}</div>
                  <div>Address : {c.address}</div>
                  <div>Summary : {c.summary}</div>
                </div>
              ))}
            {view && !closedComplaint.length && <div>No Closed Complaints</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdHome;
