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

export const UserContext = createContext();

function App() {
  const [clean, setClean] = useState(false);
  const fsetClean = (v) => setClean(v);
  const [fruitList, setFruitList] = useState([1, 2, 3, 4]);
  const fsetFruitList = (v) => {
    const newList = fruitList.filter((f) => f !== v);
    setFruitList(newList);
  };
  const fsetNewFruitList = () => {
    setFruitList([1, 2, 3, 4]);
  };
  const [myFruits, setMyFruits] = useState([]);
  const fsetMyFruits = (v) => {
    const newList = [...myFruits, v];
    console.log(newList);
    setMyFruits(newList);
  };
  const [grave, setGrave] = useState(0);
  const fsetGrave = (v) => setGrave((prev) => prev + v);

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
      }}
    >
      <Screen>
        <Navbar />
        <CardDeck />
        <CardContainer>
          {fruitList.map((fruit) => (
            <Card key={fruit} number={fruit} />
          ))}

          {/* <Card order={2} />
          <Card order={3} />
          <Card order={5} /> */}
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
