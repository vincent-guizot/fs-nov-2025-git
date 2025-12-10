import React, { useState, useEffect } from "react";
import axios from "axios";
import useMembers from "../hooks/useMember";

const MatchMaking = () => {
  const { members, loading } = useMembers();

  // Participant 1 state
  const [p1Number, setP1Number] = useState("");
  const [p1Gender, setP1Gender] = useState("M");
  const [p1Username, setP1Username] = useState("");

  // Participant 2 state
  const [p2Gender, setP2Gender] = useState("F");
  const [p2Selection, setP2Selection] = useState([]);

  // Status submit
  const [submitting, setSubmitting] = useState(false);

  // Update Participant 1 username real-time
  useEffect(() => {
    const member = members.find(
      (m) => m.number === p1Number && m.gender === p1Gender
    );
    setP1Username(member ? member.name : "");
  }, [p1Number, p1Gender, members]);

  // Update Participant 2 gender opposite of Participant 1
  useEffect(() => {
    setP2Gender(p1Gender === "M" ? "F" : "M");
    setP2Selection([]);
  }, [p1Gender]);

  const handleP2Select = (member) => {
    if (p2Selection.some((m) => m.number === member.number)) {
      setP2Selection(p2Selection.filter((m) => m.number !== member.number));
    } else if (p2Selection.length < 3) {
      setP2Selection([...p2Selection, member]);
    }
  };

  // Submit likes
  const handleSubmit = async () => {
    if (!p1Number || p2Selection.length === 0) {
      alert("Please select Participant 1 and at least one Participant 2");
      return;
    }

    const payload = {
      participant1: p1Number,
      participant2: p2Selection.map((m) => m.number),
    };

    try {
      setSubmitting(true);
      await axios.post("http://localhost:4000/likes", payload);
      alert("Likes submitted!");
      // Reset selections
      setP1Number("");
      setP1Gender("M");
      setP1Username("");
      setP2Selection([]);
    } catch (err) {
      console.error(err);
      alert("Failed to submit likes");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 space-y-8">
      {/* Participant 1 */}
      <div className="bg-base-200 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Participant 1</h2>
        {loading ? (
          <p>Loading members...</p>
        ) : (
          <div className="flex flex-col space-y-4">
            <select
              className="select select-bordered w-full"
              value={p1Number}
              onChange={(e) => setP1Number(e.target.value)}
            >
              <option value="">Select Number</option>
              {members
                .filter((m) => m.gender === p1Gender)
                .map((m) => (
                  <option key={m.number} value={m.number}>
                    {m.number}
                  </option>
                ))}
            </select>

            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="p1Gender"
                  value="M"
                  checked={p1Gender === "M"}
                  onChange={(e) => setP1Gender(e.target.value)}
                  className="radio"
                />
                <span>M</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="p1Gender"
                  value="F"
                  checked={p1Gender === "F"}
                  onChange={(e) => setP1Gender(e.target.value)}
                  className="radio"
                />
                <span>F</span>
              </label>
            </div>

            <input
              type="text"
              value={p1Username}
              readOnly
              placeholder="Username"
              className="input input-bordered w-full"
            />
          </div>
        )}
      </div>

      {/* Participant 2 */}
      <div className="bg-base-200 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">
          Participant 2 (Gender: {p2Gender})
        </h2>
        {loading ? (
          <p>Loading members...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {members
              .filter((m) => m.gender === p2Gender)
              .map((m) => (
                <button
                  key={m.number}
                  onClick={() => handleP2Select(m)}
                  className={`card p-4 border rounded-lg shadow-md text-center transition-all duration-200 ${
                    p2Selection.some((sel) => sel.number === m.number)
                      ? "border-primary bg-primary text-white scale-105"
                      : "hover:border-primary hover:scale-105"
                  }`}
                >
                  <p className="font-bold">{m.name}</p>
                  <p>{m.number}</p>
                </button>
              ))}
          </div>
        )}
        <p className="mt-4">
          Selected ({p2Selection.length}/3):{" "}
          {p2Selection.map((m) => m.name).join(", ")}
        </p>
      </div>

      {/* Submit button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="btn btn-success"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Likes"}
        </button>
      </div>
    </div>
  );
};

export default MatchMaking;
