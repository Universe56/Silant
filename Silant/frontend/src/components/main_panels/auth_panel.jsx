import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AuthMaitenanceTable from "../tables/auth_maitenance_table.jsx";
import AuthRepairTable from "../tables/auth_repair_table.jsx";
import AuthCarTable from "../tables/auth_car_table.jsx";
import "./tabs.css";
import AuthManualTable from "../tables/auth_manual_table.jsx";

const AuthPanel = (props) => {
  const [button, setButton] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);

  let group = props.group;
  let repairGroups = [2, 3];

  const showButton = (index) => {
    setButton(index);
    setTabIndex(index);
  };

  return (
    <div>
      <h1>
        Информация о комплектации и технических характеристиках Вашей техники
      </h1>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => showButton(index)}>
        <TabList>
          <Tab>
            Машины
            {group === 2 && button === 0 && (
              <Link to={"car/create"}>
                <button className="edit">➕</button>
              </Link>
            )}
          </Tab>
          <Tab>
            ТО
            {button === 1 && (
              <Link to={"maitenance/create"}>
                <button className="edit">➕</button>
              </Link>
            )}
          </Tab>
          <Tab>
            Рекламации
            {repairGroups.includes(group) && button === 2 && (
              <Link to={"repair/create"}>
                <button className="edit">➕</button>
              </Link>
            )}
          </Tab>
          {group === 2 && (
            <Tab>
              <>
                Справочники
                <Link to={"manual/create"}>
                  <button className="edit">➕</button>
                </Link>
              </>
            </Tab>
          )}
        </TabList>
        <TabPanel>
          <AuthCarTable />
        </TabPanel>
        <TabPanel>
          <AuthMaitenanceTable />
        </TabPanel>
        <TabPanel>
          <AuthRepairTable />
        </TabPanel>
        {group === 2 && (
          <TabPanel>
            <AuthManualTable />
          </TabPanel>
        )}
      </Tabs>
    </div>
  );
};
export default AuthPanel;
