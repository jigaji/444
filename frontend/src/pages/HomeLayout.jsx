// HomeLayout.js

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Header from "./Header";

const HomeLayout = () => {
  return (
    <>
      <Header />
        <HomeContainer>
          <Sidebar />
          <Outlet />
        </HomeContainer>

    </>
  );
};

const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  position: relative;
`;

export default HomeLayout;