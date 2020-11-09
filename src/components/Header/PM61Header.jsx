import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { Link } from "react-router-dom";
import { Avatar, Button, Dropdown, Layout, Menu, Space } from "antd";
//import { auth } from "../../firebase";

const { Header } = Layout;
//const { SubMenu } = Menu;

export function TopNav() {
  const user = useContext(UserContext);
  const { photoURL, displayName, email } = user;
  const usermenu = (
    <Menu>
      <Menu.Item key="1">{email}</Menu.Item>
    </Menu>
  );
  return (
    <Header className="header">
      <div className="logo"></div>
      <Menu mode="horizontal" defaultSelectedKeys={["2"]}>
        <Menu.Item key="1">
          <Link to="/pages/Dashboard">Dashboards</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/pages/Questions">Questions</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/pages/Answers">Answers</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/pages/Catalogs">Catalogs</Link>
        </Menu.Item>
        <Menu.Item>
          <Button type="primary">Create</Button>
        </Menu.Item>
        <Menu.Item style={{ float: "right" }}>
          <Dropdown overlay={usermenu}>
            <Button type="text">
              <Space>
                <Avatar size="small" src={photoURL} /> {displayName}
              </Space>
            </Button>
          </Dropdown>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default TopNav;
