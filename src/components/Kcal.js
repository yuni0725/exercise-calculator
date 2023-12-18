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

function Kcal({ id, exer, hour }) {
  return (
    <Wrapper key={id}>
      <SpanWrapper>
        <Span>
          {Object.values(exer)[0]} kcal for {hour}h
        </Span>
      </SpanWrapper>
    </Wrapper>
  );
}

export default Kcal;
