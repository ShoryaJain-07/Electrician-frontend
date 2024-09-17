import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../../constant/constant.js";

const AdComp = () => {
  const navigate = useNavigate();
  const [openComplaint, setOpenComplaint] = useState(null);
  const [closedComplaint, setClosedComplaint] = useState(null);

  const getComp = () => {
    axios.get(`${URL}/admin/get-open-complaints`).then((resp) => {
      setOpenComplaint(resp.data.data);
    });
    axios.get(`${URL}/admin/get-closed-complaints`).then((res) => {
      setClosedComplaint(res.data.data);
    });
  };

  useEffect(() => {
    getComp();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${URL}/admin/delete-complaint?complaintId=${id}`)
      .then((res) => {
        alert("Complaint deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex text-white bg-[#272727] w-full min-h-screen">
      <div className="p-8 w-[20%] bg-[#171717]">
        <div className="text-5xl font-bold mb-12">ElecZone</div>
        <div className="text-2xl flex flex-col gap-6">
          <div
            className="p-4 hover:bg-[#303030] cursor-pointer rounded-lg"
            onClick={() => navigate("/admin/electrician")}
          >
            Electrician
          </div>
          <div className="rounded-lg bg-[#303030] cursor-pointer p-4">
            Complaints
          </div>
        </div>
      </div>

      <div className="w-[80%] p-20">
        <div className="w-full flex justify-end text-xl text-white mb-12">
          <div
            className="py-3 px-8 rounded-lg bg-blue-700 cursor-pointer"
            onClick={() => navigate("/admin/addcom")}
          >
            Add Complaint
          </div>
        </div>

        <div className="grid grid-cols-2 text-white">
          <div className="p-4">
            <div className="font-bold text-4xl text-center w-full mb-8">
              Open Complaints
            </div>
            {!openComplaint && (
              <div className="w-full text-center text-lg">
                No Open Complaints
              </div>
            )}
            {openComplaint &&
              openComplaint.map((oc) => (
                <div className="w-full p-2 rounded-xl bg-[#171717] my-4">
                  <div>Category : {oc.category}</div>
                  <div>Description : {oc.description}</div>
                  <div>Name : {oc.name}</div>
                  <div>Address : {oc.address}</div>
                  <div
                    className="text-center cursor-pointer my-2 rounded-lg bg-red-600 p-1 w-1/4"
                    onClick={() => handleDelete(oc._id)}
                  >
                    Delete
                  </div>
                </div>
              ))}
          </div>
          <div className="p-4">
            <div className="font-bold text-4xl text-center w-full mb-8">
              Closed Complaints
            </div>
            {!closedComplaint && (
              <div className="w-full text-center text-lg">
                No Closed Complaints
              </div>
            )}
            {closedComplaint &&
              closedComplaint.map((c) => (
                <div className="w-full p-2 rounded-xl bg-[#171717] my-4">
                  <div>Category : {c.category}</div>
                  <div>Description : {c.description}</div>
                  <div>Name : {c.name}</div>
                  <div>Address : {c.address}</div>
                  <div>Summary : {c.summary}</div>
                  <div
                    className="text-center cursor-pointer my-2 rounded-lg bg-red-600 p-1 w-1/4"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdComp;
