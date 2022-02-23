import React from "react";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Container>
      <Logo>Twist</Logo>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  background: rgba(50, 50, 50, 0.2);
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
`;
const Logo = styled.div`
  font-size: 1.5rem;
  margin: 0 1.5rem;
`;
