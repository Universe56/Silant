import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const AuthManualTable = () => {
  const [manual, setManual] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  let url = "http://127.0.0.1:8002/api/manual/";

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const message = `Справочников не найдено`;
        setManual(message);
        setError(true);
        setLoading(false);
      } else {
        const jdata = await response.json();
        if (jdata === []) {
          const message = "Справочников не найдено";
          setManual(message);
          setError(true);
          setLoading(false);
        } else {
          setManual(jdata);
          setLoading(false);
        }
      }
    }
    fetchData();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    manual
  ) : (
    <div className="app-inner-container">
      <table>
        <thead>
          <tr>
            <th scope="col">id справочника</th>
            <th scope="col">Название</th>
            <th scope="col">Описание</th>
            <th scope="col">Тип</th>
          </tr>
        </thead>
        <tbody>
          {manual.map((m) => (
            <tr key={m.id}>
              <td data-label="id справочника">
                <Link to={`../../manual/${m.id}`}>{m.id}</Link>
              </td>

              <td data-label="Название">{m.name}</td>

              <td data-label="Описание">{m.description}</td>

              <td data-label="Тип">{m.manual_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AuthManualTable;
