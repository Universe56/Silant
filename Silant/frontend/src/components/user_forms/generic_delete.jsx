import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Delete = () => {
  const { id } = useParams();
  const model = window.location.pathname.split("/")[1];
  const [data, setData] = useState([]);
  const [entity, setEntity] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8002/api/${model}/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        switch (model) {
          case "car":
            setEntity("машины");
            setData(data.serial_number);
            break;
          case "manual":
            setEntity("справочника");
            setData(data.name);
            break;
          case "repair":
            setEntity("ТО от");
            setData(data.contract_date);
            break;
          case "maitenance":
            setEntity("рекламации");
            setData(data.issue_date);
            break;
        }
      });
  }, []);

  const handleYes = () => {
    fetch(`http://127.0.0.1:8002/api/${model}/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    }).then(() => {
      window.location.replace("http://127.0.0.1:8002/");
    });
  };

  const handleNo = () => {
    window.location.replace("http://127.0.0.1:8002/");
  };

  return (
    data && (
      <div className="app-inner-container" style={{ display: "block" }}>
        <label>
          Удаление {entity} {data}.
        </label>
        <br />
        <label> Вы уверены?</label>
        <br />
        <div>
          <button style={{ margin: ".5em" }} onClick={handleYes}>
            Да
          </button>
          <button style={{ margin: ".5em" }} onClick={handleNo}>
            Нет
          </button>
        </div>
      </div>
    )
  );
};

export default Delete;
