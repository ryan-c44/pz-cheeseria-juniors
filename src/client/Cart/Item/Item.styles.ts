import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightblue;
  border-radius: 20px;
  height: 100%;
  cursor: pointer;
  
  button {
    border-radius: 0 0 20px 20px;
    background-color: primary;
  }
  img {
    max-height: 250px;
    width: 100%;
    border-radius: 20px 20px 0 0;
  }
  div {
    font-family: Arial, Helvetica, sans-serif;
    height: 100%;
    .text-content {
      padding: 1rem;
    }
  }
`;