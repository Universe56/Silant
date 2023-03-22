import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
const AuthMaitenanceTable = () => {
  const [maitenance, setMaitenance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [permState, setPermState] = useState([]);

  const { id } = useParams();

  let url;

  if (id === undefined) {
    url = `http://127.0.0.1:8002/api/maitenance/`;
  } else {
    url = `http://127.0.0.1:8002/api/maitenance/${id}/car`;
  }

  const handleFilter = (value, name) => {
    if (value === "сброс") {
      setMaitenance(permState);
    } else {
      const filtered = maitenance.filter((element) => element[name] === value);
      setMaitenance(filtered);
    }
  };

  const handleUnique = (name) => {
    const unique = [];
    for (let m of maitenance) {
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
        const message = `ТО не найдено`;
        setMaitenance(message);
        setError(true);
        setLoading(false);
      } else {
        const jdata = await response.json();
        if (jdata === []) {
          const message = "ТО не найдено";
          setMaitenance(message);
          setError(true);
          setLoading(false);
        } else {
          setPermState(jdata);
          setMaitenance(jdata);
          setLoading(false);
        }
      }
    }
    fetchData();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    maitenance
  ) : (
    <div className="app-inner-container">
      <table>
        <thead>
          <tr>
            <th scope="col">
              Зав. № машины
              <br />
              <select
                onChange={(e) =>
                  handleFilter(e.target.value, "car_serial_number")
                }
              >
                <option>сброс</option>
                {handleUnique("car_serial_number").map((car_serial_number) => (
                  <option key={car_serial_number} value={car_serial_number}>
                    {car_serial_number}
                  </option>
                ))}
              </select>
            </th>
            <th scope="col">
              Вид ТО
              <br />
              <select
                onChange={(e) => handleFilter(e.target.value, "type_name")}
              >
                <option>сброс</option>
                {handleUnique("type_name").map((type_name) => (
                  <option key={type_name} value={type_name}>
                    {type_name}
                  </option>
                ))}
              </select>
            </th>
            <th scope="col">Дата проведениия</th>
            <th scope="col">Наработка, м/час</th>
            <th scope="col">№ заказ-наряда</th>
            <th scope="col">Дата заказ-наряда</th>
            <th scope="col">
              Орг. проводившая ТО
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
          <>
            <div className="select-container">
              <label>
                <div>
                  Вид ТО
                  <br />
                  <select
                    onChange={(e) => handleFilter(e.target.value, "type_name")}
                  >
                    <option>сброс</option>
                    {handleUnique("type_name").map((type_name) => (
                      <option key={type_name} value={type_name}>
                        {type_name}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
              <label>
                <div>
                  Зав. номер
                  <br />
                  <select
                    onChange={(e) =>
                      handleFilter(e.target.value, "car_serial_number")
                    }
                  >
                    <option>сброс</option>
                    {handleUnique("car_serial_number").map((model) => (
                      <option key={model} value={model}>
                        {model}
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
          </>
        )}
        <tbody>
          {maitenance.map((m) => (
            <tr key={m.id}>
              <td data-label="Зав. № машины">
                <Link to={`../../car/details/${m.car_serial_number}`}>
                  {m.car_serial_number}
                </Link>
              </td>

              <td data-label="Вид ТО">
                <Link to={`../../manual/${m.type}`}>{m.type_name}</Link>
              </td>

              <td data-label="Дата проведения">{m.date}</td>

              <td data-label="Наработка, м/час">{m.operating_time}</td>

              <td data-label="№ Заказ-наряда">{m.contract_serial_number}</td>

              <td data-label="Дата заказ-наряда">{m.contract_date}</td>
              <td data-label="Орг. проводившая ТО">
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
export default AuthMaitenanceTable;
