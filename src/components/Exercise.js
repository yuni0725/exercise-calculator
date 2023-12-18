import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  margin-bottom: 20px;
`;

const SpanWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Span = styled.span`
  text-align: center;
  font-size: 16px;
  font-weight: 400;
`;

function Exercise({ id, time, exer }) {
  return (
    <Wrapper key={id}>
      <SpanWrapper>
        <Span>{time}</Span>
        <Span>{Object.keys(exer)[0]}</Span>
      </SpanWrapper>
    </Wrapper>
  );
}

export default Exercise;
