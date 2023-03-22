import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GeneralPanel from "./main_panels/general_panel.jsx";
import AppFooter from "./footer/footer.jsx";
import AppHeader from "./header/header.jsx";
import Login from "./header/login.jsx";
import Logout from "./header/logout.jsx";
import CarTable from "./tables/unauth_car_table.jsx";
import GeneralManual from "./tables/manual.jsx";
import AuthCarDetail from "./tables/auth_car_detail.jsx";
import Company from "./tables/company.jsx";
import Delete from "./user_forms/generic_delete.jsx";
import CarCreate from "./user_forms/car/car_create.jsx";
import "./styles.css";
import MaitenanceCreate from "./user_forms/maitenance/mait_create.jsx";
import RepairCreate from "./user_forms/repair/repair_create.jsx";
import ManualCreate from "./user_forms/manual/manual_create.jsx";

const App = () => {
  return (
    <div className="App">
      <Router>
        <AppHeader />
        <Routes>
          <Route path="/" element={<GeneralPanel />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/logout" element={<Logout />} exact />

          <Route path="/company/:id" element={<Company />} exact />

          <Route path="/car/:id" element={<CarTable />} exact />
          <Route path="/car/create" element={<CarCreate />} />
          <Route path="/car/details/:id" element={<AuthCarDetail />} />
          <Route path="/car/details/:id/delete" element={<Delete />} />

          <Route path="/manual/:id" element={<GeneralManual />} />
          <Route path="/manual/create" element={<ManualCreate />} />
          <Route path="/manual/:id/delete" element={<Delete />} />

          <Route path="/maitenance/create" element={<MaitenanceCreate />} />
          <Route path="/maitenance/:id/delete" element={<Delete />} />

          <Route path="/repair/create" element={<RepairCreate />} />
          <Route path="/repair/:id/delete" element={<Delete />} />
        </Routes>
        <AppFooter />
      </Router>
    </div>
  );
};

export default App;
