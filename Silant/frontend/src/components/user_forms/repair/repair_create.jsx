import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const RepairCreate = () => {
  const [manuals, setManuals] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const submit = async () => {
      const response = await fetch("http://127.0.0.1:8002/api/repair/", {
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
      const response = await fetch("http://127.0.0.1:8002/api/manual/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setManuals(data);
    };
    const fetchCars = async () => {
      const response = await fetch("http://127.0.0.1:8002/api/car/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setCars(data);
    };

    fetchManuals();
    fetchCars();
    setLoading(false);
  }, []);

  return (
    !loading && (
      <div className="app-container">
        <form onSubmit={handleSubmit(onSubmit)} className="app-form">
          <label>Зав. № машины</label>
          <select required {...register("car")}>
            <option value=""></option>
            {cars.map((model) => (
              <option key={model.id} value={model.id}>
                {model.serial_number}
              </option>
            ))}
          </select>
          <br />
          <label>Дата отказа</label>
          <input required {...register("issue_date")} type="date" />
          <br />
          <label>Наработка м/час</label>
          <input required {...register("operating_time")} />
          <br />

          <label>Узел отказа</label>
          <select required {...register("unit")}>
            <option value=""></option>
            {handleSelect(manuals, "manual_type", "Узел отказа").map(
              (model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              )
            )}
          </select>
          <br />
          <label>Описание возврата</label>
          <input required {...register("description")} />
          <br />
          <label style={{ fontSize: "small" }}>Способ восст.</label>
          <select required {...register("method")}>
            <option value=""></option>
            {handleSelect(manuals, "manual_type", "Способ восстановления").map(
              (model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              )
            )}
          </select>
          <br />
          <label style={{ fontSize: "small" }}>Запчасти</label>
          <input required {...register("repair_parts")} />
          <br />
          <label>Дата восстановления</label>
          <input required {...register("completion_date")} type="date" />
          <br />
          <button type="submit">Отправить</button>
        </form>
      </div>
    )
  );
};

export default RepairCreate;
