import styled from "styled-components";

export const SideBarWrapper = styled.div`
  background-color: #0b0424;
  position: relative;
  height: 100%;
  width: 90px;
`;

export const SidebarElementWrapper = styled.div`
  height: auto;
  width: 100%;
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`;

export const ListWrapper = styled.ul`
  list-decoration: none;
  list-style: none;
  text-align: center;
`;

export const ListElements = styled.li`
  text-align: center;
  line-height: 20px
  list-decoration: none;
  list-style: none;
  color: #fff;
  
`;
