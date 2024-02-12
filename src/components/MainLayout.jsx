import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Layout, Menu, theme } from "antd";
import { ToastContainer } from "react-toastify";
import { Link, Outlet } from "react-router-dom";
import { Typography, Box, IconButton, Menu as MenuBar, MenuItem } from '@mui/material';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {

  const { token: { colorBgContainer } } = theme.useToken();
  const getDataFromLocalStorage = () => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  };
  const userInfo = getDataFromLocalStorage();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Layout>
      <Sider>
        <div className="demo-logo-vertical" />
        <Box className="logo">
          <Typography variant="h2" className="fs-5 text-center py-2 mb-0">
            <span className="lg-logo">
              <img src='../../public/tnfb-logo.png' alt="TNFB-Logo" style={{
                height: '86px',
                width: '241px',
                marginTop: '-18px',
              }} />
            </span>
          </Typography>
        </Box>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={[
            {
              key: "dashboard",
              icon: <DashboardIcon />,
              label: "Dashboard",
            },
          ]}
          activeKey="dashboard"
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="ps-1 pe-2"
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>
              <IconButton onClick={handleClick}>
                <AccountCircleIcon sx={{ fontSize: 40, color: 'black' }} />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <div
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ cursor: 'pointer' }}
              >
                <Typography variant="body2" component="div" sx={{ mb: 0, fontWeight: 'bolder' }}>TNFB</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 0 }}>{userInfo?.email}</Typography>
              </div>
              <MenuBar
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} to="/">View Profile</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/">Signout</MenuItem>
              </MenuBar>
            </Box>
          </Box>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-center"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
