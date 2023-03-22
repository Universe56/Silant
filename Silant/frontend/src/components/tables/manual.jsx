import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const GeneralManual = () => {
  const [manual, setManual] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [manager, setManager] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await fetch(`http://127.0.0.1:8002/api/user/current/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const jdata = await data.json();
      if (jdata.groups[0] === 2) {
        setManager(true);
      }
    };

    async function fetchData() {
      const response = await fetch(`../api/manual/${id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const message = `Справочник не найден`;
        setManual(message);
        setError(true);
        setLoading(false);
      } else {
        const jdata = await response.json();
        setManual(jdata);
        setLoading(false);
      }
    }
    fetchData();
    fetchUserData();
  }, []);
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    manual
  ) : (
    <div className="app-container">
      <div className="app-inner-container">
        <div className="app-field">
          <h1>
            {manual.manual_type} {manual.name}
          </h1>
          {manager && (
            <>
              <Link to={`delete`}>
                <button className="edit">✖</button>
              </Link>
            </>
          )}
          <br />
          <h2>{manual.description}</h2>
        </div>
      </div>
    </div>
  );
};

export default GeneralManual;
