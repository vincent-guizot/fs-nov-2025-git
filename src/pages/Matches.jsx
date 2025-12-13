import React, { useEffect, useState } from "react";
import API from "../config/api";
import { FaHeart } from "react-icons/fa";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const res = await API.get("/matches");
      setMatches(res.data.matches);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const handleGenerate = async () => {
    try {
      setProcessing(true);
      await API.post("/matches/generate");
      await fetchMatches();
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure to delete all matches?")) return;

    try {
      setProcessing(true);
      await API.delete("/matches");
      setMatches([]);
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-pink-600">
        💖 Matches 💖
      </h2>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={handleGenerate}
          disabled={processing}
          className="flex-1 px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Generate Matches
        </button>

        <button
          onClick={handleDelete}
          disabled={processing}
          className="flex-1 px-5 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
        >
          Delete Matches
        </button>
      </div>

      {/* Matches List */}
      {matches.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No matches found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {matches.map((m, i) => (
            <div
              key={m.matchId}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition bg-white"
            >
              <p className="text-sm text-gray-400 mb-2">Match #{i + 1}</p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                <span className="font-semibold text-blue-600 text-center sm:text-left">
                  {m.participant1.number}
                  {m.participant1.gender === "M" ? "M" : "W"} -{" "}
                  {m.participant1.fullName}
                </span>
                <FaHeart className="text-red-500 text-xl" />
                <span className="font-semibold text-pink-600 text-center sm:text-left">
                  {m.participant2.number}
                  {m.participant2.gender === "M" ? "M" : "W"} -{" "}
                  {m.participant2.fullName}
                </span>
              </div>
              <p className="text-xs text-center mt-2 text-gray-500">
                {new Date(m.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Matches;
