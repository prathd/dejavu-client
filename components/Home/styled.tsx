import styled from "@components/UI/styled";

export const SideBarDiv = styled.div`
  height: 100%;
  width: 15%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  margin-top: 42px;
  background-color: #eef2f6; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
`;

export const MainDiv = styled.div`
  margin-left: 15%; /* Same as the width of the sidebar */
  margin-top: 42px;
  padding: 0px 10px;
`;

export const MemoryHeader = styled.h2`
  margin-bottom: 5px;
`;

export const MemoryBody = styled.ul`
  list-style-type: none;
`;
