import React, { useState, useEffect } from "react";
import axios from "axios";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch matches
  const fetchMatches = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/matches");
      setMatches(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Matches List</h2>

      {loading ? (
        <p>Loading matches...</p>
      ) : matches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra table-compact w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Participant 1</th>
                <th>Participant 2</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, index) => (
                <tr key={match.id || index}>
                  <td>{index + 1}</td>
                  <td>{match.participant1}</td>
                  <td>
                    {Array.isArray(match.participant2)
                      ? match.participant2.join(", ")
                      : match.participant2}
                  </td>
                  <td>
                    {match.date ? new Date(match.date).toLocaleString() : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Matches;
