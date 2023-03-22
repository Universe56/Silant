import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const AuthCarTable = () => {
  const [cars, setCars] = useState([]);
  const [permState, setPermState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  let url;

  if (id === undefined) {
    url = `http://127.0.0.1:8002/api/car/`;
  } else {
    url = `http://127.0.0.1:8002/api/car/${id}/`;
  }

  const handleFilter = (value, name) => {
    if (value === "сброс") {
      setCars(permState);
    } else {
      const fcars = cars.filter((element) => element[name] === value);
      setCars(fcars);
    }
  };

  const handleUnique = (name) => {
    const unique = [];
    for (let car of cars) {
      unique.push(car[name]);
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
        const message = `Машин не найдено`;
        setCars(message);
        setError(true);
        setLoading(false);
      } else {
        const jdata = await response.json();
        if (jdata === []) {
          const message = "Машин не найдено";
          setCars(message);
          setError(true);
          setLoading(false);
        } else {
          setCars(jdata);
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
    cars
  ) : (
    <div className="app-inner-container">
      <table>
        <thead>
          <tr>
            <th scope="col">Зав. № машины</th>
            <th scope="col">
              <div>
                Модель техники
                <br />
                <select
                  onChange={(e) => {
                    handleFilter(e.target.value, "model_name");
                  }}
                >
                  <option>сброс</option>
                  {handleUnique("model_name").map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>
            </th>
            <th scope="col">
              <div>
                Модель двигателя
                <br />
                <select
                  onChange={(e) =>
                    handleFilter(e.target.value, "engine_model_name")
                  }
                >
                  <option>сброс</option>
                  {handleUnique("engine_model_name").map((engine) => (
                    <option key={engine} value={engine}>
                      {engine}
                    </option>
                  ))}
                </select>
              </div>
            </th>
            <th scope="col">Зав. № двигателя</th>
            <th scope="col">
              Модель трансмиссии
              <br />
              <select
                onChange={(e) =>
                  handleFilter(e.target.value, "transmission_model_name")
                }
              >
                <option>сброс</option>
                {handleUnique("transmission_model_name").map((tran) => (
                  <option key={tran} value={tran}>
                    {tran}
                  </option>
                ))}
              </select>
            </th>
            <th scope="col">Зав. № трансмиссии</th>
            <th scope="col">
              Модель вед. моста
              <br />
              <select
                onChange={(e) =>
                  handleFilter(e.target.value, "driving_axle_model_name")
                }
              >
                <option>сброс</option>
                {handleUnique("driving_axle_model_name").map((drive) => (
                  <option key={drive} value={drive}>
                    {drive}
                  </option>
                ))}
              </select>
            </th>
            <th scope="col">Зав. № вед. моста</th>
            <th scope="col">
              Модель упр. моста
              <br />
              <select
                onChange={(e) =>
                  handleFilter(e.target.value, "steering_axle_model_name")
                }
              >
                <option>сброс</option>
                {handleUnique("steering_axle_model_name").map((steer) => (
                  <option key={steer} value={steer}>
                    {steer}
                  </option>
                ))}
              </select>
            </th>
            <th scope="col">Зав. № упр. моста</th>
            <th scope="col">Дата отгрузки</th>
            <th scope="col">Покупатель</th>
            <th scope="col">Грузополучатель</th>
            <th scope="col">Сервисная компания</th>
          </tr>
        </thead>
        {window.innerWidth <= 768 && (
          <div className="select-container">
            <label>
              <div>
                Модель
                <br />
                <select
                  onChange={(e) => handleFilter(e.target.value, "model_name")}
                >
                  <option>сброс</option>
                  {handleUnique("model_name").map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <label>
              <div>
                Двигатель
                <br />
                <select
                  onChange={(e) =>
                    handleFilter(e.target.value, "engine_model_name")
                  }
                >
                  <option>сброс</option>
                  {handleUnique("engine_model_name").map((engine) => (
                    <option key={engine} value={engine}>
                      {engine}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <label>
              <div>
                Трансмиссия
                <br />
                <select
                  onChange={(e) =>
                    handleFilter(e.target.value, "transmission_model_name")
                  }
                >
                  <option>сброс</option>
                  {handleUnique("transmission_model_name").map((tran) => (
                    <option key={tran} value={tran}>
                      {tran}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <label>
              <div>
                Вед. мост
                <br />
                <select
                  onChange={(e) =>
                    handleFilter(e.target.value, "driving_axlemodel_name")
                  }
                >
                  <option>сброс</option>
                  {handleUnique("driving_axle_model_name").map((drive) => (
                    <option key={drive} value={drive}>
                      {drive}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <label>
              <div>
                Упр. мост
                <br />
                <select
                  onChange={(e) =>
                    handleFilter(e.target.value, "steering_axle_model_name")
                  }
                >
                  <option>сброс</option>
                  {handleUnique("steering_axle_model_name").map((steer) => (
                    <option key={steer} value={steer}>
                      {steer}
                    </option>
                  ))}
                </select>
              </div>
            </label>
          </div>
        )}
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td data-label="Зав. № машины">
                <Link to={`../../car/details/${car.serial_number}`}>
                  {car.serial_number}
                </Link>
              </td>

              <td data-label="Модель техники">
                <Link to={`../../manual/${car.model}`}>{car.model_name}</Link>
              </td>

              <td data-label="Модель двигателя">
                <Link to={`../../manual/${car.engine_model}`}>
                  {car.engine_model_name}
                </Link>
              </td>

              <td data-label="Зав. № двигателя">{car.engine_serial_number}</td>

              <td data-label="Модель трансмиссии">
                <Link to={`../../manual/${car.transmission_model}`}>
                  {car.transmission_model_name}
                </Link>
              </td>

              <td data-label="Зав. № трансмиссии">
                {car.transmission_serial_number}
              </td>

              <td data-label="Модель вед. моста">
                <Link to={`../../manual/${car.driving_axle_model}`}>
                  {car.driving_axle_model_name}
                </Link>
              </td>

              <td data-label="Зав. № вед. моста">
                {car.driving_axle_serial_number}
              </td>

              <td data-label="Модель упр. моста">
                <Link to={`../../manual/${car.steering_axle_model}`}>
                  {car.steering_axle_model_name}
                </Link>
              </td>

              <td data-label="Зав. № упр. моста">
                {car.steering_axle_serial_number}
              </td>

              <td data-label="Датаотгрузки">{car.shipment_date}</td>
              <td data-label="Покупатель">{car.buyer_name}</td>
              <td data-label="Грузополучатель">{car.consignee}</td>
              <td data-label="Сервисная компания">
                <Link to={`../../company/${car.service_company}`}>
                  {car.service_company_name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AuthCarTable;
