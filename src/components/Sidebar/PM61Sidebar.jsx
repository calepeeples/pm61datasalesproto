import React from "react";
import { Input, Layout, Menu, Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { SubMenu } = Menu;
const { Sider } = Layout;
const { Search } = Input;

export function PM61Sidebar() {
  return (
    <Sider className="pm61-sider" width={230}>
      <Search
        placeholder="search for questions..."
        onSearch={(value) => console.log(value)}
        style={{ width: 230 }}
      />
      <Menu
        mode="inline"
        defaultOpenKeys={["sub1", "sub2", "sub3"]}
        defaultSelectedKeys={["1", "9"]}
      >
        <SubMenu
          key="sub1"
          icon={<FontAwesomeIcon icon={["fal", "question-circle"]} />}
          title=" Question Filters"
        >
          <Menu.Item key="1">
            <FontAwesomeIcon icon={["fal", "tally"]} /> All Questions
          </Menu.Item>
          <Menu.Item key="2">
            <FontAwesomeIcon icon={["fal", "star"]} /> Favorites
          </Menu.Item>
          <Menu.Item key="3">
            <FontAwesomeIcon icon={["fal", "check"]} /> Answered
          </Menu.Item>
          <Menu.Item key="4">
            <FontAwesomeIcon icon={["fal", "user"]} /> My Questions
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          icon={<FontAwesomeIcon icon={["fal", "tag"]} />}
          title=" Topics"
        >
          <Menu.Item key="5">
            <Tag>Sales (3)</Tag>
          </Menu.Item>
          <Menu.Item key="6">
            <Tag>Marketing (1)</Tag>
          </Menu.Item>
          <Menu.Item key="7">
            <Tag>Marked as Done (5)</Tag>
          </Menu.Item>
          <Menu.Item key="8">
            <Tag>Top Priority (1)</Tag>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          icon={<FontAwesomeIcon icon={["fal", "hashtag"]} />}
          title=" Visible Results"
        >
          <Menu.Item key="9">10</Menu.Item>
          <Menu.Item key="10">20</Menu.Item>
          <Menu.Item key="11">50</Menu.Item>
          <Menu.Item key="12">100</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}
export default PM61Sidebar;
