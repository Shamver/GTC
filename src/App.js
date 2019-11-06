import React from 'react';
import styled from 'styled-components';
import Header from './components/layout/Header';
import Content from './components/layout/Content';

const Container = styled.div`
  padding : 0 400px;
  background-color: rgb(243, 242, 240);
  @media (max-width: 1400px) {
    padding : 0;
  }
  
  height : 100vh;
`;

const App = () => (
  <Container>
    <Header />
    <Content />
  </Container>

);

export default App;
