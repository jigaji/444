// PageHeader.js

import React from "react";
import styled from "styled-components";


/**
 * PageHeader component to display the page title with optional icons
 * @param {string} pageTitle - Title of the page
 * @returns {JSX.Element} - Rendered PageHeader component
 */
const PageHeader = ({ pageTitle }) => {
  return (
    <DataHeader>
      <div className="headerLeft">
        <p>{pageTitle}</p>
      </div>
      <div className="headerRight">
        {pageTitle === "My Cloud"}
      </div>
    </DataHeader>
  );
};

const DataHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  height: 40px;

  .headerLeft {
    display: flex;
    align-items: center;
    font-weight: 600;
  }
`;

export default PageHeader;
