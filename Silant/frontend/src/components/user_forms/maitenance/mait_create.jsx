import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const MaitenanceCreate = () => {
  const [manuals, setManuals] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const submit = async () => {
      const response = await fetch("http://127.0.0.1:8002/api/maitenance/", {
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
      console.log("manuals");
      console.log(data);
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
      console.log("cars");
      console.log(data);
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
          <label>Вид ТО</label>
          <select required {...register("type")}>
            <option value=""></option>
            {handleSelect(manuals, "manual_type", "Тип ТО").map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          <br />
          <label>Наработка м/час</label>
          <input required {...register("operating_time")} />
          <br />
          <label>Дата ТО</label>
          <input required {...register("date")} type="date" />
          <br />
          <label>№ заказ-наряда</label>
          <input required {...register("contract_serial_number")} />
          <br />
          <label>Дата заказ-наряда</label>
          <input required {...register("contract_date")} type="date" />
          <br />
          <label>Самостоятельное ТО</label>
          <input {...register("self_maitenance")} type="checkbox" />
          <br />
          <button type="submit">Отправить</button>
        </form>
      </div>
    )
  );
};

export default MaitenanceCreate;
