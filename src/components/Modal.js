import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { UserContext } from "../App.js";

const Modal = () => {
  const { modalOpen, fsetModalOpen, fullScore, fsetFullScore } =
    useContext(UserContext);
  const [bonusScore, setBonusScore] = useState(1200);
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  let bonusScoreRef = useRef(bonusScore);

  useEffect(() => {
    console.log(modalOpen);

    if (modalOpen === true) {
      bonusScoreRef.current = bonusScore;
      console.log(bonusScoreRef.current, bonusScore);
      let counting = setInterval(() => {
        if (countRef.current === bonusScore) {
          clearInterval(counting);
          fsetFullScore((prev) => prev + countRef.current);
          setCount(0);
          countRef.current = 0;
        } else {
          countRef.current += 10;
          setCount(countRef.current);
          bonusScoreRef.current -= 10;
          setBonusScore(bonusScoreRef.current);
        }

        console.log(bonusScore, bonusScoreRef.current);
      }, 10);
    } else if (modalOpen === false) {
      const list = [500, 1000, 1500, 2000];
      console.log(modalOpen);
      const newCount = Math.floor(Math.random() * 4);
      setBonusScore(list[newCount]);
      console.log(newCount, bonusScore);
    }
  }, [modalOpen]);
  return (
    <ScreenCover modalOpen={modalOpen}>
      <Container>
        Congratulations!
        <Score>
          score: {fullScore + count} + {bonusScore}
        </Score>
        <Button onClick={fsetModalOpen}>Next Level</Button>
      </Container>
    </ScreenCover>
  );
};

export default Modal;

const ScreenCover = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
  z-index: 1000;
  display: ${(props) => (props.modalOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  box-sizing: border-box;
  width: 40rem;
  height: 40%;
  background-color: green;
  position: relative;
  top: -7vh;
  transition: all 0.5s;
  animation: pop 0.5s forwards;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @keyframes pop {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(100%);
    }
  }
`;
const Score = styled.div``;
const Button = styled.button`
  width: 8rem;
  height: 3rem;
  background-color: white;
  cursor: pointer;
  font-family: "Press Start 2P", cursive;
  font-size: 0.5rem;
  border-radius: 3rem;
  border: none;
  transition: all 0.2s;

  :hover {
    background-color: gray;
  }
`;
