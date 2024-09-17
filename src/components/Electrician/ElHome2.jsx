import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../../constant/constant";
import axios from "axios";

const ElHome2 = () => {
  const navigate = useNavigate();

  const [openComplaint, setOpenComplaint] = useState([]);
  const [closedComplaint, setClosedComplaint] = useState([]);

  const id = localStorage.getItem("id");
  const getc = () => {
    axios
      .get(`${URL}/electrician/get-complaints?electricianId=${id}`)
      .then((res) => {
        setClosedComplaint(res.data.data.closedComplaints);
        setOpenComplaint(res.data.data.openComplaints);
      });
  };

  useEffect(() => {
    getc();
  }, []);

  return (
    <div className="flex text-white bg-[#272727] w-full min-h-screen">
      <div className="w-[20%] bg-[#171717]">
        <div className="p-8 h-screen">
          <div className="text-5xl font-bold mb-12 h-[7%]">ElecZone</div>
          <div className="flex flex-col justify-between h-[80%]">
            <div className="text-2xl flex flex-col gap-6">
              <div
                className="p-4 hover:bg-[#303030] cursor-pointer rounded-lg"
                onClick={() => navigate("/electrician")}
              >
                Alloted Complaints
              </div>
              <div className="rounded-lg bg-[#303030] cursor-pointer p-4">
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
        <div className="w-full flex">
          <div className="w-1/2 p-4">
            <div className="mb-4 text-3xl font-bold">Open Complaints</div>

            {openComplaint &&
              openComplaint.map((c) => (
                <div className="w-full p-2 rounded-xl bg-[#171717] my-4">
                  <div>Category : {c.category}</div>
                  <div>Description : {c.description}</div>
                  <div>Name : {c.name}</div>
                  <div>Address : {c.address}</div>
                </div>
              ))}
            {!openComplaint && <div>No Open Complaints</div>}
          </div>
          <div className="w-1/2 p-4">
            <div className="mb-4 text-3xl font-bold">Closed Complaints</div>

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
            {!closedComplaint && <div>No Closed Complaints</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElHome2;
