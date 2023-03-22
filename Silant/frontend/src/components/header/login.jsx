import React, { useState, useEffect } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      window.location.replace("http://127.0.0.1:8002/");
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    fetch("http://127.0.0.1:8002/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.key) {
          localStorage.clear();
          localStorage.setItem("token", data.key);
          window.location.replace("http://127.0.0.1:8002/");
        } else {
          setUsername("");
          setPassword("");
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  return (
    <div className="app-container">
      {errors === true && <h2>Неправильные учётные данные.</h2>}
      {loading === false && (
        <form onSubmit={onSubmit} className="app-form">
          <label htmlFor="username">Логин</label> <br />
          <input
            name="username"
            type="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />{" "}
          <br />
          <label htmlFor="password">Пароль</label> <br />
          <input
            name="password"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <br />
          <button type="submit">Войти</button>
        </form>
      )}
    </div>
  );
};

export default Login;
