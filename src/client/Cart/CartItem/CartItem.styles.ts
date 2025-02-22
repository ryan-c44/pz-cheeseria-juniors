import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-block;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: 1px solid lightblue;
  padding-bottom: 20px;
  width: 100%;
  p {
    padding: 10px;
  }
  div {
    flex: 1;
  }
  .information,
  .buttons {
    display: flex;
    justify-content: space-between;
  }
  img {
    max-width: 120px;
    max-height: 75px;
    object-fit: cover;
    margin-left: 40px;
    border-radius: 100;
  }
`;
