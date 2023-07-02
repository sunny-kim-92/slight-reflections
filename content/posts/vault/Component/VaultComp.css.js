import styled from 'styled-components';

export const Container = styled.div`
  height: 80vh;
`

export const Intro = styled.div`
  display: block;

  h1 {
    font-size: 2rem;
  }

  h5 {
    font-size: 2rem;
  }
`;

export const FlexBottom = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 4rem;

  span {
    font-size: 3rem;
  }
`;

export const NextBottom = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 4rem;
`;

export const FinalContainer = styled.div`
  padding-right: 4vw;

  div {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    margin-bottom: 20px;
  }

  h1 {
    font-weight: 500;
    font-size: 3.5rem;
  }
  h2 {
    font-weight: 500;
    font-size: 2rem;
  }
  h3 {
    margin: 0 5px;
  }
`;

export const ListText = styled.h1`
  font-size: 2rem;
  font-weight: 450;
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
  padding: 0 4rem;
  margin: 2rem 0;
`;

export const Question = styled.h1`
  font-size: 2rem;
`;

export const Big = styled.span`
  display: block;
  font-size: 2rem;
  .hide {
    opacity: 0;
    transition: opacity 1s;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  padding: 0px 16px 24px 16px;
  box-sizing: border-box;
`;

export const Item = styled.div`
  display: flex;
  font-size: 1.5em;
  font-weight: 400;
  align-items: center;
  position: relative;
  transition: 0.3s;
`;

export const RadioButtonLabel = styled.label`
  position: absolute;
  top: 25%;
  left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 1px solid #bebebe;
`;
export const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  margin-right: 10px;
  &:hover ~ ${RadioButtonLabel} {
    background: #bebebe;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      margin: 5px 6px;
      background: #eeeeee;
    }
  }
  &:checked + ${RadioButtonLabel} {
    background: #db7290;
    border: 1px solid #db7290;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 11px;
      height: 11px;
      margin: 5px 6px;
      box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
      background: white;
    }
  }
`;
