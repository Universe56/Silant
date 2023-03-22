import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const AuthRepairTable = () => {
  const [repair, setRepair] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [permState, setPermState] = useState([]);

  const { id } = useParams();

  let url;

  if (id === undefined) {
    url = `http://127.0.0.1:8002/api/repair/`;
  } else {
    url = `http://127.0.0.1:8002/api/repair/${id}/car/`;
  }

  const handleFilter = (value, name) => {
    if (value === "сброс") {
      setRepair(permState);
    } else {
      const filtered = repair.filter((element) => element[name] === value);
      setRepair(filtered);
    }
  };

  const handleUnique = (name) => {
    const unique = [];
    for (let m of repair) {
      unique.push(m[name]);
    }
    let result = [...new Set(unique)];
    return result;
  };

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
        const message = `Рекламаций не найдено`;
        setRepair(message);
        setError(true);
        setLoading(false);
      } else {
        const jdata = await response.json();
        if (jdata === []) {
          const message = "Рекламаций не найдено";
          setRepair(message);
          setError(true);
          setLoading(false);
        } else {
          setRepair(jdata);
          setPermState(jdata);
          setLoading(false);
        }
      }
    }
    fetchData();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    repair
  ) : (
    <div className="app-inner-container">
      <table>
        <thead>
          <tr>
            <th scope="col">Зав. № машины</th>
            <th scope="col">Дата отказа</th>
            <th scope="col">Наработка, м/час</th>
            <th scope="col">
              Узел отказа
              <br />
              <select
                onChange={(e) => handleFilter(e.target.value, "unit_name")}
              >
                <option>сброс</option>
                {handleUnique("unit_name").map((unit_name) => (
                  <option key={unit_name} value={unit_name}>
                    {unit_name}
                  </option>
                ))}
              </select>
            </th>
            <th scope="col">Описание отказа</th>
            <th scope="col">
              Способ восстановления
              <br />
              <select
                onChange={(e) => handleFilter(e.target.value, "method_name")}
              >
                <option>сброс</option>
                {handleUnique("method_name").map((method_name) => (
                  <option key={method_name} value={method_name}>
                    {method_name}
                  </option>
                ))}
              </select>
            </th>
            <th scope="col">Исп. запчасти</th>
            <th scope="col">Дата восстановления</th>
            <th scope="col">Время простоя</th>
            <th scope="col">
              Сервисная компания
              <br />
              <select
                onChange={(e) =>
                  handleFilter(e.target.value, "service_company_name")
                }
              >
                <option>сброс</option>
                {handleUnique("service_company_name").map(
                  (service_company_name) => (
                    <option
                      key={service_company_name}
                      value={service_company_name}
                    >
                      {service_company_name}
                    </option>
                  )
                )}
              </select>
            </th>
          </tr>
        </thead>
        {window.innerWidth <= 768 && (
          <div className="select-container">
            <label>
              <div>
                Узел отказа
                <br />
                <select
                  onChange={(e) => handleFilter(e.target.value, "unit_name")}
                >
                  <option>сброс</option>
                  {handleUnique("unit_name").map((unit_name) => (
                    <option key={unit_name} value={unit_name}>
                      {unit_name}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <label>
              <div>
                Способ восстановления
                <br />
                <select
                  onChange={(e) => handleFilter(e.target.value, "method_name")}
                >
                  <option>сброс</option>
                  {handleUnique("method_name").map((method_name) => (
                    <option key={method_name} value={method_name}>
                      {method_name}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <label>
              <div>
                Серв. компания
                <br />
                <select
                  onChange={(e) =>
                    handleFilter(e.target.value, "service_company_name")
                  }
                >
                  <option>сброс</option>
                  {handleUnique("service_company_name").map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>
            </label>
          </div>
        )}
        <tbody>
          {repair.map((m) => (
            <tr key={m.id}>
              <td data-label="Зав. № машины">
                <Link to={`../../car/details/${m.car_serial_number}`}>
                  {m.car_serial_number}
                </Link>
              </td>
              <td data-label="Дата отказа">{m.issue_date}</td>
              <td data-label="Наработка, м/час">{m.operating_time}</td>
              <td data-label="Узел отказа">
                <Link to={`../../manual/${m.unit}/`}>{m.unit_name}</Link>
              </td>
              <td data-label="Описание отказа">{m.description}</td>
              <td data-label="Способ восстановления">
                <Link to={`../../manual/${m.method}`}>{m.method_name}</Link>
              </td>
              <td data-label="Исп. запчасти">{m.repair_parts}</td>
              <td data-label="Дата восстановления">{m.completion_date}</td>
              <td data-label="Время простоя">{m.repair_time} д.</td>
              <td data-label="Сервисная компания">
                <Link to={`../../company/${m.service_company}`}>
                  {m.service_company_name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AuthRepairTable;
