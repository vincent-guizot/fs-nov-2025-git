import { useState, useEffect } from "react";
import axios from "axios";

const useMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/members");
      setMembers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (member) => {
    try {
      await axios.post("http://localhost:4000/members", member);
      fetchMembers(); // refresh data
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return { members, loading, fetchMembers, addMember };
};

export default useMembers;
