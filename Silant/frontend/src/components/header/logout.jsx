import React, { useState, useEffect } from "react";

const Logout = () => {
  const [isAuth, setIsAuth] = useState(Boolean);

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      setIsAuth(false);
      window.location.replace("http://127.0.0.1:8002/");
    } else {
      setIsAuth(true);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    const logout = async () => {
      await fetch("http://127.0.0.1:8002/api/auth/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      localStorage.clear();
      window.localStorage.clear();
      setIsAuth(false);
      window.location.replace("http://127.0.0.1:8002/");
    };
    logout();
  };

  return (
    <>
      <div children="app-container">
        <div className="app-inner-container">
          <label>Вы уверены, что хотите выйти?</label>
        </div>
      </div>
      <div className="app-container">
        {isAuth && (
          <form className="app-form" style={{ justifyItems: "center" }}>
            <input
              type="submit"
              value="Да"
              onClick={handleLogout}
              style={{ float: "right" }}
            />
            <input
              type="submit"
              value="Нет"
              onClick={() => window.location.replace("http://127.0.0.1:8002/")}
              style={{ float: "left" }}
            />
          </form>
        )}
      </div>
    </>
  );
};

export default Logout;
