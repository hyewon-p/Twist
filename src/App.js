import React, {
  memo,
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";
import styled from "styled-components";

import Navbar from "./components/Navbar";
import { Card, CardDeck, MyCard } from "./components/Card";
import "./reset.css";
import Score from "./components/Score";
import Modal from "./components/Modal";

export const UserContext = createContext();

function App() {
  const [clean, setClean] = useState(false);
  const fsetClean = (v) => setClean(v);
  const [fruitList, setFruitList] = useState([1, 2, 3, 4]);
  const fsetFruitList = (v) => {
    const newList = fruitList.filter((f) => f !== v);
    setFruitList(newList);
  };
  //필드에 카드 다시 4장 세팅
  const fsetNewFruitList = () => {
    setFruitList([1, 2, 3, 4]);
  };
  //패의 카드
  const [myFruits, setMyFruits] = useState([]);
  const fsetMyFruits = (v) => {
    const newList = [...myFruits, v];
    console.log(newList);
    setMyFruits(newList);
  };
  //무덤의 카드 수
  const [grave, setGrave] = useState(0);
  const fsetGrave = (v) => setGrave((prev) => prev + v);
  //패의 과일 수
  const [score, setScore] = useState(0);
  const fsetScore = (v) => {
    setScore((prev) => prev + v);
  };

  const [goal, setGoal] = useState(0);
  const setRandomGoal = () => {
    const randomGoal = Math.floor(Math.random() * 20) + 1;
    setGoal(randomGoal);
  };

  const [modalOpen, setModalOpen] = useState();
  const fsetModalOpen = () => setModalOpen((prev) => !prev);

  const [fullScore, setFullScore] = useState(0);
  const fsetFullScore = (v) => {
    setFullScore(v);
  };

  const reset = () => {
    setRandomGoal();
    setGrave(0);
    setScore(0);
    setMyFruits([]);
    fsetNewFruitList();
  };

  useEffect(() => setRandomGoal(), []);
  useEffect(() => {
    if (modalOpen === false) {
      reset();
    }
  }, [modalOpen]);
  useEffect(() => {
    if (goal !== 0 && score === goal) {
      console.log("성공");
      setModalOpen(true);
    }
  }, [score]);
  useEffect(() => {
    if (fruitList.length === 0) {
      fsetClean(false);
      fsetNewFruitList();
    }
  }, [fruitList]);
  return (
    <UserContext.Provider
      value={{
        fsetFruitList,
        clean,
        fsetClean,
        myFruits,
        fsetMyFruits,
        fsetNewFruitList,
        fsetGrave,
        fruitList,
        score,
        fsetScore,
        goal,
        modalOpen,
        fsetModalOpen,
        fullScore,
        fsetFullScore,
      }}
    >
      <Screen>
        <Navbar />
        <Modal />
        <FullScore>score: {fullScore}</FullScore>
        <CardDeck />
        <Score />
        <CardContainer>
          {fruitList.map((fruit) => (
            <Card key={fruit} number={fruit} />
          ))}
        </CardContainer>
        <MyCardContainer>
          {myFruits.map((fruit) => (
            <MyCard
              key={fruit.index}
              type={fruit.diceValue}
              amount={fruit.fruitAmount}
            />
          ))}
        </MyCardContainer>
        <Grave>{grave}</Grave>
      </Screen>
    </UserContext.Provider>
  );
}

export default App;

const Screen = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  background-color: royalblue;
  flex-direction: column;

  @media (max-width: 670px) {
    ::after {
      content: "sorry! screen is too small";
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1000;
      background-color: gray;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
const FullScore = styled.div`
  position: absolute;
  top: 5rem;
  left: 1.5rem;
  font-size: 1.1rem;
  padding: 0.7rem;
`;
const CardContainer = styled.div`
  margin-top: -10vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  //background-color: bisque;
`;
const MyCardContainer = styled.div`
  width: 400px;
  height: 220px;
  position: absolute;
  bottom: 0;
  left: calc(50vw - 200px);
  margin: 1rem;
  max-height: 220px;
  display: flex;
  flex-wrap: wrap;
  flex-wrap: nowrap;
`;
const Grave = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: purple;
  position: absolute;
  left: 5vw;
  bottom: 5vw;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
