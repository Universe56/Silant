import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ManualCreate = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const submit = async () => {
      const response = await fetch("http://127.0.0.1:8002/api/manual/", {
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

  const MANUALS = [
    "Модель техники",
    "Двигатель",
    "Трансмиссия",
    "Ведущий мост",
    "Управляемый мост",
    "Тип ТО",
    "Компания",
    "Способ восстановления",
    "Узел отказа",
  ];

  return (
    <div className="app-container">
      <form onSubmit={handleSubmit(onSubmit)} className="app-form">
        <label>Название</label>
        <input required {...register("name")} />
        <br />
        <label>Описание</label>
        <input required {...register("description")} />
        <br />
        <label>Тип справочника</label>
        <select required {...register("manual_type")}>
          <option value=""></option>
          {MANUALS.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default ManualCreate;
