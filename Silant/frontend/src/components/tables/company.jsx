import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Company = () => {
  const [manual, setManual] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`../api/service-company/${id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const message = `Компания не найдена`;
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
  }, []);
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    car
  ) : (
    <div className="app-container">
      <div className="app-inner-container">
        <div className="app-field">
          <h1>Сервисная компания {manual.name}</h1>
          <br />
          <h2>{manual.description}</h2>
        </div>
      </div>
    </div>
  );
};

export default Company;
