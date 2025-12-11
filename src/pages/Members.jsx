import React, { useState } from "react";
import Swal from "sweetalert2";
import useMembers from "../hooks/useMember";

const Members = () => {
  const { members, loading, addMember } = useMembers();

  const [formData, setFormData] = useState({
    fullName: "",
    number: "",
    address: "",
    image: "",
    gender: "M",
  });

  const [filterGender, setFilterGender] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addMember(formData);

    Swal.fire({
      title: "Success!",
      text: "Member has been added.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });

    setFormData({
      fullName: "",
      number: "",
      address: "",
      image: "",
      gender: "M",
    });
  };

  const filteredMembers = filterGender
    ? members.filter((m) => m.gender === filterGender)
    : members;

  return (
    <div className="p-4 space-y-6">
      {/* FORM */}
      <div className="bg-base-200 p-3">
        <h2 className="text-lg font-semibold mb-4">Add Member</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
              className="input input-bordered border-base-300 w-full"
            />
          </div>

          {/* NUMBER */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Number</span>
            </label>
            <input
              type="text"
              name="number"
              placeholder="Enter number"
              value={formData.number}
              onChange={handleChange}
              className="input input-bordered border-base-300 w-full"
            />
          </div>

          {/* GENDER */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="M"
                  checked={formData.gender === "M"}
                  onChange={handleChange}
                  className="radio radio-sm"
                />
                <span>Male</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="F"
                  checked={formData.gender === "F"}
                  onChange={handleChange}
                  className="radio radio-sm"
                />
                <span>Female</span>
              </label>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!formData.fullName || !formData.number}
          >
            Add Member
          </button>
        </form>
      </div>

      <hr />

      {/* TABLE */}
      <div className="bg-base-200 p-3 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Members List</h2>

        {/* FILTER */}
        <div className="flex gap-2 mb-4">
          <button
            className={`btn btn-xs ${
              filterGender === "" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setFilterGender("")}
          >
            All
          </button>
          <button
            className={`btn btn-xs ${
              filterGender === "M" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setFilterGender("M")}
          >
            Male
          </button>
          <button
            className={`btn btn-xs ${
              filterGender === "F" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setFilterGender("F")}
          >
            Female
          </button>
        </div>

        {loading ? (
          <p>Loading members...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full border border-base-100 py-3 px-2">
              <thead>
                <tr className="bg-base-100 text-sm">
                  <th className="border border-base-100">Name</th>
                  <th className="border border-base-100">Number</th>
                  <th className="border border-base-100">Gender</th>
                  <th className="border border-base-100">Address</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id}>
                    <td className="border border-base-100">
                      {member.fullName}
                    </td>
                    <td className="border border-base-100">{member.number}</td>
                    <td className="border border-base-100">{member.gender}</td>
                    <td className="border border-base-100">{member.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;
