import React, { useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../App.js";

const Score = () => {
  const { score, goal } = useContext(UserContext);

  return (
    <ScoreContainer>
      {score} / {goal}
    </ScoreContainer>
  );
};

export default Score;

const ScoreContainer = styled.div`
  position: absolute;
  top: calc(4rem + 8px);
  right: 4vw;
  padding: 1.3rem;
  border: 2px black dashed;
  background-color: beige;
`;
