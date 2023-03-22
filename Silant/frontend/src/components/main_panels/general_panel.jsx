import React, { useState, useEffect } from "react";
import SearchBar from "./search.jsx";
import AuthPanel from "./auth_panel.jsx";

const GeneralPanel = () => {
  const [userData, setUserData] = useState([]);
  const [Auth, setAuth] = useState([]);
  const [userType, setUserType] = useState([]);
  const [username, setUsername] = useState([]);

  useEffect(() => {
    const fetchUserName = async (id, group) => {
      let g;
      switch (group) {
        case 1:
          g = "client";
          break;
        case 2:
          g = "manager";
          break;
        case 3:
          g = "service-company";
          break;
      }
      const data = await fetch(`http://127.0.0.1:8002/api/${g}/${id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const jdata = await data.json();
      setUsername(jdata.name);
    };
    const fetchUserData = async () => {
      const data = await fetch(`http://127.0.0.1:8002/api/user/current/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });

      const jdata = await data.json();
      setUserData(jdata);
      setUserType(jdata.groups[0]);
      fetchUserName(jdata.id, jdata.groups[0]);
      setAuth(true);
    };
    if (localStorage.getItem("token") === null) {
      setAuth(false);
    } else {
      fetch("http://127.0.0.1:8002/api/auth/user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then(() => {
          fetchUserData();
        });
    }
  }, []);

  return (
    <div className="app-container">
      {Auth ? (
        <>
          <h2 className="app-inner-container">{username}</h2>
          <div className="app-inner-container">
            <AuthPanel group={userType} />
          </div>
        </>
      ) : (
        <>
          <div className="app-inner-container">
            <SearchBar />
          </div>
        </>
      )}
    </div>
  );
};

export default GeneralPanel;
