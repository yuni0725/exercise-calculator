import { useEffect, useState } from "react";
import styled from "styled-components";
import Exercise from "./components/Exercise";
import Kcal from "./components/Kcal";

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 1fr 10fr;
  text-align: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 800;
  text-align: center;
`;

const SubTitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const SubTitle = styled.div`
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const GridBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 10px 10px;
`;

const AddButton = styled.button`
  width: 26px;
  height: 26px;
  border: 3px solid gray;
  border-radius: 13px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 5px;

  width: 250px;
  height: 70px;
`;

const TimeInput = styled.input`
  border: 2px solid black;
  border-radius: 30px;

  padding-left: 10px;
`;

const Select = styled.select`
  border: 2px solid black;
  border-radius: 30px;

  padding-left: 10px;
`;

const Option = styled.option``;

const Submit = styled.input`
  border: 2px solid black;
  border-radius: 30px;
  background-color: #c2c2c2;
  &:hover {
    opacity: 0.8;
  }

  font-size: 15px;
  font-weight: 800;

  cursor: pointer;
`;

const exerciseJson = [
  { 걷기: 270 },
  { 빠르게걷기: 390 },
  { 달리기: 630 },
  { 계단오르내리기: 310 },
  { 테니스: 330 },
  { 수상스키: 450 },
  { 체조: 180 },
  { 에어로빅: 330 },
  { 수영: 720 },
  { 골프: 270 },
  { 스키: 540 },
  { 등산: 780 },
  { 자전거타기: 270 },
  { 스케이팅: 390 },
];

function getDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  const dateString = year + "-" + month + "-" + day;
  return dateString;
}

function App() {
  const [date, setDate] = useState("");
  const [kcal, setKcal] = useState(0);
  const [showing, setShowing] = useState(true);
  const [exercise, setExercise] = useState([]);

  const [values, setValues] = useState(0);

  const [firstValue, setFirstValue] = useState("");
  const [secValue, setSecValue] = useState("");

  useEffect(() => {
    const stringData = getDate();
    setDate(stringData);
  }, []);

  useEffect(() => {
    if (exercise.length !== 0) {
      exercise.map((exer) => {
        const kcalPerHour = Object.values(exer.exer)[0];
        const hour = exer.hour;
        setKcal((kcal) => kcal + kcalPerHour * hour);
      });
    }
  }, [exercise]);

  const onClick = () => {
    setShowing(!showing);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    const firstList = firstValue.split(":");
    const secList = secValue.split(":");
    const first = new Date(
      year,
      month,
      day,
      Number(firstList[0]),
      Number(firstList[1])
    );
    const second = new Date(
      year,
      month,
      day,
      Number(secList[0]),
      Number(secList[1])
    );
    const diffMSec = first.getTime() - second.getTime();
    const diffHour = Math.floor(Math.abs(diffMSec / (60 * 60 * 1000)));

    const id = Math.floor(today.getMilliseconds() * Math.random() * 100000);

    const array = {
      time: `${firstValue}~${secValue}`,
      exer: exerciseJson[values],
      hour: diffHour,
      id: id,
    };
    setExercise([...exercise, array]);
    setShowing(!showing);
  };

  const onFirstChange = (e) => {
    setFirstValue(e.target.value);
  };

  const onSecChange = (e) => {
    setSecValue(e.target.value);
  };

  const onSelectChange = (e) => {
    const optionValue = e.target.value;
    setValues(Number(optionValue) - 1);
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>Exercise Calculator</Title>
      </TitleWrapper>
      <SubTitleWrapper>
        <SubTitle>{date}</SubTitle>
        <SubTitle>{kcal} Kcal</SubTitle>
      </SubTitleWrapper>
      <GridWrapper>
        <GridBox>
          {exercise.map((exer) => (
            <Exercise key={exer.id} time={exer.time} exer={exer.exer} />
          ))}
          {showing ? (
            <AddButton onClick={onClick}>➕</AddButton>
          ) : (
            <InputWrapper>
              <Form onSubmit={onSubmit}>
                <TimeInput
                  type="time"
                  autoComplete="false"
                  onChange={onFirstChange}
                  required
                ></TimeInput>
                <Select
                  onChange={onSelectChange}
                  required
                  defaultValue="0"
                  name="걷기"
                >
                  <Option value="1">걷기</Option>
                  <Option value="2">빠르게걷기</Option>
                  <Option value="3">달리기</Option>
                  <Option value="4">계단오르내리기</Option>
                  <Option value="5">테니스</Option>
                  <Option value="6">수상스키</Option>
                  <Option value="7">체조</Option>
                  <Option value="8">에어로빅</Option>
                  <Option value="9">수영</Option>
                  <Option value="10">골프</Option>
                  <Option value="11">스키</Option>
                  <Option value="12">등산</Option>
                  <Option value="13">자전거타기</Option>
                  <Option value="14">스케이팅</Option>
                </Select>
                <TimeInput
                  type="time"
                  autoComplete="false"
                  onChange={onSecChange}
                  required
                ></TimeInput>
                <Submit type="submit" value="Add"></Submit>
              </Form>
            </InputWrapper>
          )}
        </GridBox>
        <GridBox>
          {exercise.map((exer) => (
            <Kcal key={exer.id} exer={exer.exer} hour={exer.hour} />
          ))}
        </GridBox>
      </GridWrapper>
    </Wrapper>
  );
}

export default App;
