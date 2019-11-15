import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import * as Proptypes from 'prop-types';
import Header from './components/layout/Header';
import Content from './components/layout/Content';
import Category from './components/layout/Category';
import { useStores } from './stores/useStores';

const ContainerWrapper = styled.div`
  background-color: rgb(243, 242, 240);
`;

const Container = styled.div`
  max-width: none !important;
  margin-right: auto;
  margin-left: auto;

  
  @media (min-width: 0px) {
      width: 100%;
  }
  
  @media (min-width: 768px) {
      width: 690px;
  }

  @media (min-width: 992px) {
      width: 910px;
  }
  
  @media (min-width: 1200px) {
      width: 1200px;
  }
  height : 100vh;
`;

const UnderSection = styled(Row)`
  margin : 0 !important;
`;

const P5Col = styled(Col)`
  padding : 0 10px 0 5px !important;
`;

const P5Col2 = styled(Col)`
  padding : 0 5px 0 0px !important;
`;

const App = ({ location, match, history }) => {
  const { RouteStore } = useStores();
  RouteStore.setRoute(location, match, history);
  useEffect(() => {

  });

  return (
    <ContainerWrapper>
      <Container>
        <Header />
        <UnderSection>
          <P5Col>
            <Category />
          </P5Col>
          <P5Col2 xs="10">
            <Content />
          </P5Col2>
        </UnderSection>
      </Container>
    </ContainerWrapper>
  );
};

App.propTypes = {
  location: Proptypes.shape({}).isRequired,
  match: Proptypes.shape({}).isRequired,
  history: Proptypes.shape({}).isRequired,
};

export default App;
