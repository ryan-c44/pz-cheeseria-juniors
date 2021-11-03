import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-block;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .buttons {
      display: inline-block;
  }

  .buttons .close {
      float: right;
  }

  img {
    max-height: 100px;
    border-radius: 100px;
    object-fit: cover;
    float: right;
  }

  div {
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;
  }
  p {
    text-align: justify;
  }

  h4 {
    text-transform: capitalize;
  }
`;