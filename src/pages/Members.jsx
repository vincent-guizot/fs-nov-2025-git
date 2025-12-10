import React, { useState } from "react";
import useMembers from "../hooks/useMember";

const Members = () => {
  const { members, loading, addMember } = useMembers();

  const [formData, setFormData] = useState({
    name: "John Doe",
    number: "08123456789",
    address: "Jakarta",
    image: "",
    gender: "M",
  });

  const [filterGender, setFilterGender] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMember(formData);
    // Reset form
    setFormData({
      name: "John Doe",
      number: "08123456789",
      address: "Jakarta",
      image: "",
      gender: "M",
    });
  };

  const filteredMembers = filterGender
    ? members.filter((m) => m.gender === filterGender)
    : members;

  return (
    <div className="p-4 space-y-6">
      {/* Form */}
      <div className="bg-base-200 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Add Member</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="number"
              placeholder="Number"
              value={formData.number}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value="M"
                checked={formData.gender === "M"}
                onChange={handleChange}
                className="radio"
              />
              <span>M</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value="F"
                checked={formData.gender === "F"}
                onChange={handleChange}
                className="radio"
              />
              <span>F</span>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!formData.name || !formData.number}
          >
            Add Member
          </button>
        </form>
      </div>

      {/* Members Table */}
      <div className="bg-base-200 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Members List</h2>

        {/* Filter */}
        <div className="flex space-x-2 mb-4">
          <button
            className={`btn btn-sm ${
              filterGender === "" ? "btn-primary" : "btn-ghost"
            }`}
            onClick={() => setFilterGender("")}
          >
            All
          </button>
          <button
            className={`btn btn-sm ${
              filterGender === "M" ? "btn-primary" : "btn-ghost"
            }`}
            onClick={() => setFilterGender("M")}
          >
            Male
          </button>
          <button
            className={`btn btn-sm ${
              filterGender === "F" ? "btn-primary" : "btn-ghost"
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
            <table className="table table-zebra table-compact w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Number</th>
                  <th>Address</th>
                  <th>Gender</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id}>
                    <td>{member.name}</td>
                    <td>{member.number}</td>
                    <td>{member.address}</td>
                    <td>{member.gender}</td>
                    <td>
                      {member.image && (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-12 h-12 rounded-full"
                        />
                      )}
                    </td>
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
