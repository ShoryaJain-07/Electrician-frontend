import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../../constant/constant";

const ElHome = () => {
  const navigate = useNavigate();
  const [openComplaint, setOpenComplaint] = useState([]);
  const [summary, setSummary] = useState("");

  const id = localStorage.getItem("id");

  const getc = () => {
    
    axios
      .get(`${URL}/electrician/get-complaints?electricianId=${id}`)
      .then((res) => {
        setOpenComplaint(res.data.data.openComplaints);
      });
  };

  useEffect(() => {
    getc();
  }, []);

  const handleClose = (complaintId) => {
    axios
      .post(`${URL}/electrician/close-complaint`, {
        complaintId: complaintId,
        summary: summary,
        electricianId: id,
      })
      .then((res) => {
        console.log(res.data.statusCode);
        if (res.data.statusCode === 200) {
          alert("Complaint closed");
        }
      });
      setSummary("")
  }

  return (
    <div className="flex text-white bg-[#272727] w-full min-h-screen">
      <div className="w-[20%] bg-[#171717]">
        <div className="p-8 w-full h-screen">
          <div className="text-5xl font-bold mb-12 h-[7%]">ElecZone</div>
          <div className="flex flex-col justify-between h-[80%]">
            <div className="text-2xl flex flex-col gap-6">
              <div className="rounded-lg bg-[#303030] cursor-pointer p-4">
                Alloted Complaints
              </div>
              <div
                className="p-4 hover:bg-[#303030] cursor-pointer rounded-lg"
                onClick={() => navigate("/electrician/complaint")}
              >
                All Complaints
              </div>
            </div>
            <div>
              <div
                className="p-2 rounded-lg cursor-pointer bg-red-500 text-center text-xl"
                onClick={() => {
                  localStorage.setItem("id", "");
                  navigate("/");
                }}
              >
                LogOut
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[80%] p-20">
        <div className="w-full flex justify-start text-4xl font-bold text-white mb-6">
          <div className="rounded-lg cursor-pointer">Alloted Complaints</div>
        </div>
        <div className="p-6 grid grid-cols-3 gap-6">
          {openComplaint &&
            openComplaint.map((c) => (
              <div className="w-full p-2 rounded-xl bg-[#171717] my-4 flex flex-col gap-2">
                <div>Category : {c.category}</div>
                <div>Description : {c.description}</div>
                <div>Name : {c.name}</div>
                <div>Address : {c.address}</div>
                <div>Summary</div>
                <input
                  type="text"
                  onChange={(e) => setSummary(e.target.value)}
                  className="bg-inherit rounded-lg w-full p-2 border"
                />
                <div
                  className="text-center p-2 rounded-lg bg-green-500"
                  onClick={() => handleClose(c._id)}
                >
                  Close
                </div>
              </div>
            ))}
          {!openComplaint.length && <div>No Open Complaints</div>}
        </div>
      </div>
    </div>
  );
};

export default ElHome;
