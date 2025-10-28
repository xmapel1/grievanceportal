import { useEffect, useState } from "react";

function Grievances() {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGrievances() {
      const res = await fetch("https://grievanceportal-e75f.onrender.com/api/grievances");
      const data = await res.json();
      console.log("Fetched data:", data);
      setGrievances(data);
      setLoading(false);
    }

    fetchGrievances();
  }, []);

  if (loading) return <p>Loading grievances...</p>;

  return (
    <div className="page-container">
      <h1>Submitted Grievances</h1>
      {grievances.length === 0 ? (
        <p>No grievances found.</p>
      ) : (
        <ul>
          {grievances.map((g) => (
            <li key={g.id}>
              <strong>{g.subject}</strong> — {g.name} <br />
              <em>{g.message}</em>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Grievances;
