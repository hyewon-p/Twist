import React, {
  memo,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import styled from "styled-components";

import { UserContext } from "../App.js";

function importAll(r) {
  let images = [];
  r.keys().forEach((item, index) => {
    images.push(r(item));
  });
  return images;
}

const images = importAll(
  require.context("../images", false, /\.(png|jpe?g|svg)$/)
);

export const CardDeck = () => {
  const { fsetClean, fsetGrave, fruitList } = useContext(UserContext);
  return (
    <Deck
      onClick={() => {
        fsetClean(true);
        fsetGrave(fruitList.length);
      }}
    />
  );
};

const Deck = styled.button`
  margin: 0 3vw;
  background-color: peru;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5%;
  position: absolute;
  top: 0;
  box-shadow: inset 10px -5px darkgoldenrod;
  cursor: pointer;
  border: none;

  @media (min-width: 901px) {
    width: 200px;
    height: 300px;
    transform: translateY(-20vh);
  }
  @media (max-width: 900px) {
    width: 16vw;
    height: 24vw;
    transform: translateY(-60px);
  }

  :hover {
    ::before {
      content: "n left";
      font-family: "Press Start 2P", cursive;
      font-size: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 40px;
      background-color: white;
      position: relative;
      top: 120px;
      left: 90px;
      border-radius: 10px;
    }
  }
`;

//필드에 있는 카드
export const Card = memo(({ number }) => {
  const [fruitAmount, setFruitAmount] = useState(0);
  //처음 렌더링될 때 과일 수를 정함
  useEffect(() => {
    setFruitAmount(Math.floor(Math.random() * 5) + 1);
  }, []);
  //카드가 패에 있을지 필드에 있을지 결정
  const [getCard, setGetCard] = useState(false);
  //App.js에서 필요한 변수를 가져옴
  const {
    clean,
    myFruits,
    fsetClean,
    fsetMyFruits,
    fsetFruitList,
    fsetNewFruitList,
  } = useContext(UserContext);
  //카드를 버릴지 결정하는 state
  const [cleaning, setCleaning] = useState(false);
  useEffect(() => {
    if (clean) {
      setCleaning(true);
    } else {
      setCleaning(false);
    }

    console.log("cleaning:", cleaning);
  }, [clean]);

  const selectCard = (fruitAmount) => {
    console.log("selected");
    //setGetCard(true);
    const ifIncluded = Object.values(myFruits).map((e) => {
      if (Object.values(e).includes(diceValue)) {
        return true;
      } else {
        return false;
      }
    });
    console.log(ifIncluded, diceValue);
    if (
      (myFruits.length === 0 || ifIncluded.includes(true)) &&
      myFruits.length < 5
    ) {
      fsetMyFruits({ diceValue, fruitAmount });
      fsetFruitList(number);
    }
  };

  const [diceValue, setDiceValue] = useState(null);

  useEffect(() => {
    setDiceValue(Math.floor(Math.random() * 11));
  }, []);

  return (
    <Container
      onAnimationEnd={() => {
        fsetFruitList(number);
      }}
      clean={cleaning}
      onClick={() => selectCard(fruitAmount)}
    >
      {[...Array(fruitAmount)].map((n, index) => {
        console.log("n:", fruitAmount);
        return <Fruit src={images[diceValue]} amount={fruitAmount} />;
      })}
    </Container>
  );
});
const Container = styled.button`
  margin: 0 3vw;
  border: 1px solid beige;
  background-color: beige;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  border-radius: 5%;
  padding: 20px;
  cursor: pointer;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;

  @keyframes discard {
    0% {
    }
    100% {
      transform: translate(-50vw, 50vh) scale(0);
    }
  }

  //position: ${(props) => (props.clean === true ? "absolute" : "flex")};
  animation: ${(props) =>
    props.clean === true ? "discard 0.5s forwards" : "none"};

  :hover {
    background-color: ${(props) => (props.toggle ? "black" : "gray")};
    z-index: 100;
  }
  width: 130px;
  height: 220px;
`;

//패에 있는 카드
export const MyCard = ({ type, amount }) => {
  //App.js에서 필요한 변수를 가져옴
  const { myFruits } = useContext(UserContext);

  const [diceValue, setDiceValue] = useState(null);

  useEffect(() => {
    setDiceValue(Math.floor(Math.random() * 11));
  }, []);

  return (
    <MyContainer>
      {[...Array(amount)].map((n, index) => {
        return <Fruit src={images[type]} amount={amount} />;
      })}
    </MyContainer>
  );
};

const MyContainer = styled.button`
  border: 1px solid beige;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5%;
  cursor: pointer;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  padding: 20px;

  flex-shrink: 0;

  //transition: transform 0.4s linear;

  :hover {
    z-index: 100;
  }
  width: 130px;
  height: 220px;

  &:nth-child(2) {
    transform: translateX(-5vw);
  }
  &:nth-child(3) {
    transform: translateX(-10vw);
  }
  &:nth-child(4) {
    transform: translateX(-15vw);
  }
  &:nth-child(5) {
    transform: translateX(-20vw);
  }
`;

const Fruit = styled.img`
  width: 35px;

  &:nth-child(1) {
    grid-area: ${(props) =>
      props.amount === 2 || props.amount === 4 ? "3/3/4/4" : "2/2/3/3"};
  }
  &:nth-child(2) {
    grid-area: 1/1/2/2;
  }
  &:nth-child(3) {
    grid-area: ${(props) => (props.amount === 4 ? "1/3/2/4" : "3/3/4/4")};
  }
  &:nth-child(4) {
    grid-area: 3/1/4/2;
  }
  &:nth-child(5) {
    grid-area: 1/3/2/4;
  }
`;
