import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import API from "../config/api";
import useMembers from "../hooks/useMember";
import { FaMale, FaFemale, FaHeart } from "react-icons/fa";

const MatchMaking = () => {
  const { members, loading } = useMembers();

  const [participantGender, setParticipantGender] = useState("");
  const [participantId, setParticipantId] = useState("");
  const [selectedLikes, setSelectedLikes] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const participant = members.find((m) => m._id === participantId);
  const oppositeGender = participant?.gender === "M" ? "F" : "M";

  // ===============================
  // TOGGLE LIKE (MAX 4)
  // ===============================
  const toggleLike = (id) => {
    if (selectedLikes.includes(id)) {
      setSelectedLikes(selectedLikes.filter((x) => x !== id));
      return;
    }

    if (selectedLikes.length >= 4) {
      Swal.fire("Limit reached", "Max 4 likes allowed", "warning");
      return;
    }

    setSelectedLikes([...selectedLikes, id]);
  };

  // ===============================
  // SUBMIT
  // ===============================
  const submitLikes = async () => {
    if (!participantId || selectedLikes.length === 0) {
      Swal.fire("Error", "Choose participant & likes first", "error");
      return;
    }

    try {
      setSubmitting(true);
      await API.post("/likes/submit", {
        participantId,
        likes: selectedLikes,
      });

      Swal.fire("Success", "Likes submitted & matched!", "success");
      setSelectedLikes([]);
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to submit",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* TITLE */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-700">💘 Match Making</h2>
        <p className="text-sm text-gray-500">
          Choose participant & select up to 4 people you like
        </p>
      </div>

      {/* ===============================
          GENDER SELECTOR (COOL)
      =============================== */}
      <div className="flex justify-center gap-6">
        <button
          onClick={() => {
            setParticipantGender("M");
            setParticipantId("");
            setSelectedLikes([]);
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-md border transition ${
            participantGender === "M"
              ? "bg-blue-600 text-white border-blue-600 scale-105"
              : "bg-white hover:bg-blue-50"
          }`}
        >
          <FaMale size={16} />
          Male
        </button>

        <button
          onClick={() => {
            setParticipantGender("F");
            setParticipantId("");
            setSelectedLikes([]);
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-md border transition ${
            participantGender === "F"
              ? "bg-pink-500 text-white border-pink-500 scale-105"
              : "bg-white hover:bg-pink-50"
          }`}
        >
          <FaFemale size={16} />
          Female
        </button>
      </div>

      {/* ===============================
          PARTICIPANT DROPDOWN
      =============================== */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Select Participant
        </label>
        <select
          className="border px-3 py-2 w-full rounded"
          disabled={!participantGender}
          value={participantId}
          onChange={(e) => {
            setParticipantId(e.target.value);
            setSelectedLikes([]);
          }}
        >
          <option value="">Choose participant...</option>
          {members
            .filter((m) => m.gender === participantGender)
            .map((m) => (
              <option key={m._id} value={m._id}>
                {m.number}
                {m.gender === "M" ? "M" : "W"} - {m.fullName}
              </option>
            ))}
        </select>
      </div>

      {/* ===============================
          SELECT LIKES
      =============================== */}
      {participant && (
        <>
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">
              Select Likes ({oppositeGender === "M" ? "Male" : "Female"})
            </h3>
            <span className="text-sm text-gray-500">
              {selectedLikes.length} / 4 selected
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {members
              .filter(
                (m) => m.gender === oppositeGender && m._id !== participantId
              )
              .map((m) => {
                const active = selectedLikes.includes(m._id);
                const disabled = !active && selectedLikes.length >= 4;

                return (
                  <div
                    key={m._id}
                    onClick={() => !disabled && toggleLike(m._id)}
                    className={`p-4 border rounded-lg text-center transition ${
                      active
                        ? "bg-green-600 text-white scale-105"
                        : disabled
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:border-green-500 cursor-pointer"
                    }`}
                  >
                    <p className="">{m.fullName}</p>
                    <p className="text-xl font-semibold">{m.number}</p>

                    {active && <FaHeart className="mx-auto mt-2 text-white" />}
                  </div>
                );
              })}
          </div>
        </>
      )}

      {/* ===============================
          SUBMIT
      =============================== */}
      <button
        onClick={submitLikes}
        disabled={submitting || !participantId}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Likes"}
      </button>
    </div>
  );
};

export default MatchMaking;
