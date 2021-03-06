import React from "react";
import styled from "styled-components";

const TagContainer = styled.div`
  display: inline-table;
  font-size: 10px;
  padding: 2px 4px;
  margin: 0px 4px;
  min-width: 64px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
  border-radius: 16px;
  cursor: pointer;
`;

const TagText = styled.span`
  display: table-cell;
  vertical-align: middle;
`;

const Tag = ({ text, onClick, active, disabled }) => {
  return (
    <TagContainer
      onClick={onClick}
      style={{
        backgroundColor: disabled
          ? "powderblue"
          : active
          ? "lightpink"
          : "lightgrey",
        cursor: disabled ? "default" : "pointer",
      }}
    >
      <TagText>{text}</TagText>
    </TagContainer>
  );
};

export default Tag;
