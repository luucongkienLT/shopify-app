import { useState } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, Button } from "antd";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Products from "./Products";

import { HomeIcon, ProductIcon } from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";
const { Sider, Header } = Layout;
const items = [
  {
    key: "1",
    icon: <Icon source={HomeIcon} tone="base" />,
    label: <Link to="/">Dashboard</Link>,
  },
  {
    key: "2",
    icon: <Icon source={ProductIcon} tone="base" />,
    label: <Link to="/products">Products</Link>,
  },
];
const LayoutScreen = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <div style={{ padding: "10px 20px" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </div>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutScreen;
