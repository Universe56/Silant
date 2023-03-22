import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CarCreate = () => {
  const [manuals, setManuals] = useState([]);
  const [clients, setClients] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const submit = async () => {
      const response = await fetch("http://127.0.0.1:8002/api/car/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        window.location.replace("http://127.0.0.1:8002/");
      }
    };
    submit();
  };

  const handleSelect = (data, t, name) => {
    return data.filter((i) => i[t] === name);
  };

  useEffect(() => {
    const fetchManuals = async () => {
      const response = await fetch("http://127.0.0.1:8002/api/manual/");
      const data = await response.json();
      setManuals(data);
    };
    const fetchClients = async () => {
      const response = await fetch("http://127.0.0.1:8002/api/client/");
      const data = await response.json();
      setClients(data);
    };
    const fetchCompanies = async () => {
      const response = await fetch(
        "http://127.0.0.1:8002/api/service-company/"
      );
      const data = await response.json();
      setCompanies(data);
    };
    fetchManuals();
    fetchClients();
    fetchCompanies();
    setLoading(false);
  }, []);

  return (
    !loading && (
      <div className="app-container">
        <form onSubmit={handleSubmit(onSubmit)} className="app-form">
          <label>Зав. № машины</label>
          <input required {...register("serial_number")} />
          <br />
          <label>Модель техники</label>
          <select required {...register("model")}>
            <option value=""></option>
            {handleSelect(manuals, "manual_type", "Модель техники").map(
              (model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              )
            )}
          </select>
          <br />
          <label>Модель двигателя</label>
          <select required {...register("engine_model")}>
            <option value=""></option>
            {handleSelect(manuals, "manual_type", "Двигатель").map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          <br />
          <label>Зав № двигателя</label>
          <input required {...register("engine_serial_number")} />
          <br />
          <label>Трансмиссия</label>
          <select required {...register("transmission_model")}>
            <option value=""></option>
            {handleSelect(manuals, "manual_type", "Трансмиссия").map(
              (model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              )
            )}
          </select>
          <br />
          <label>Зав № трансмиссии</label>
          <input required {...register("transmission_serial_number")} />
          <br />
          <label>Вед. мост</label>
          <select required {...register("driving_axle_model")}>
            <option value=""></option>
            {handleSelect(manuals, "manual_type", "Ведущий мост").map(
              (model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              )
            )}
          </select>
          <br />
          <label>Зав № вед. моста</label>
          <input required {...register("driving_axle_serial_number")} />
          <br />
          <label>Упр. мост</label>
          <select required {...register("steering_axle_model")}>
            <option value=""></option>
            {handleSelect(manuals, "manual_type", "Ведущий мост").map(
              (model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              )
            )}
          </select>
          <br />
          <label>Зав № упр. моста</label>
          <input required {...register("steering_axle_serial_number")} />
          <br />

          <label>Дата отгрузки</label>
          <input required {...register("shipment_date")} type="date" />
          <br />

          <label>Покупатель</label>
          <select required {...register("buyer")}>
            <option value=""></option>
            {clients.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          <br />
          <label>Грузополучатель</label>
          <input required {...register("consignee")} />
          <br />
          <label>Адрес поставки</label>
          <input required {...register("delivery_adress")} />
          <br />
          <label>Комплектация</label>
          <input required {...register("additional_equipment")} />
          <br />
          <label>Сервисная компания</label>
          <select required {...register("service_company")}>
            <option value=""></option>
            {companies.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          <br />
          <button type="submit">Отправить</button>
        </form>
      </div>
    )
  );
};

export default CarCreate;
