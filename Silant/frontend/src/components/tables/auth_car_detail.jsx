import "./tables.css";
import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AuthMaitenanceTable from "./auth_maitenance_table.jsx";
import AuthRepairTable from "./auth_repair_table.jsx";

const AuthCarDetail = () => {
  const [car, setCar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://127.0.0.1:8002/api/car/${id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const message = `Машина не найдена`;
        setCar(message);
        setError(true);
        setLoading(false);
      } else {
        const jdata = await response.json();
        setCar(jdata);
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
      <div className="app-field">
        <h3>Машина № {car.serial_number}</h3>
        <Link to={`delete`}>
          <button className="edit">✖</button>
        </Link>
      </div>
      <div className="app-inner-container">
        <h1>
          Информация о комплектации и технических характеристиках Вашей техники
        </h1>

        <Tabs>
          <TabList>
            <Tab>Общая информация</Tab>
            <Tab>ТО</Tab>
            <Tab>Рекламации</Tab>
          </TabList>
          <TabPanel>
            <table>
              <thead>
                <tr>
                  <th scope="col">Зав. № машины</th>
                  <th scope="col">Модель техники</th>
                  <th scope="col">Модель двигателя</th>
                  <th scope="col">Зав. № двигателя</th>
                  <th scope="col">Модель транс миссии</th>
                  <th scope="col">Зав. № транс миссии</th>
                  <th scope="col">Модель вед. моста</th>
                  <th scope="col">Зав. № вед. моста</th>
                  <th scope="col">Модель упр. моста</th>
                  <th scope="col">Зав. № упр. моста</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Зав. № машины">{car.serial_number}</td>
                  <td data-label="Модель техники">
                    <Link to={`../../manual/${car.model}`}>
                      {car.model_name}
                    </Link>
                  </td>

                  <td data-label="Модель двигателя">
                    <Link to={`../../manual/${car.engine_model}`}>
                      {car.engine_model_name}
                    </Link>
                  </td>

                  <td data-label="Зав. № двигателя">
                    {car.engine_serial_number}
                  </td>

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
                </tr>
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <AuthMaitenanceTable />
          </TabPanel>
          <TabPanel>
            <AuthRepairTable />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthCarDetail;
