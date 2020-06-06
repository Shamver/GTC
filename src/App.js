import React, { useEffect, memo } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';
import Header from './components/layout/Header';
import Content from './components/layout/Content';
import Category from './components/layout/Category';
import useStores from './stores/useStores';
import CustomSidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

const App = ({ history }) => {
  const { UtilRouteStore, UserStore } = useStores();
  const { setRoute } = UtilRouteStore;
  const { cookieCheck, cookieChecked } = UserStore;
  useEffect(() => {
    cookieCheck();
    setRoute(history);
  }, [cookieCheck, setRoute, history]);
  return (
    <>
      { cookieChecked && (
        <ContainerWrapper>
          <div>
            <Container>
              <Header />
              <UnderSection>
                <P5Col>
                  <Category />
                </P5Col>
                <P5Col2>
                  <Content />
                </P5Col2>
              </UnderSection>
            </Container>
            <Footer />
            <CustomSidebar />
          </div>
        </ContainerWrapper>
      )}
    </>
  );
};

App.propTypes = {
  history: Proptypes.shape({}).isRequired,
};

const ContainerWrapper = styled.div`
  background-color: rgb(243, 242, 240);
  min-height : 100vh;
`;

const Container = styled.div`
  max-width: none !important;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 0px) {
      width: 100%;
  }
  
  @media (min-width: 768px) {
      width: 100%;
  }

  @media (min-width: 992px) {
      width: 910px;
  }
  
  @media (min-width: 1200px) {
      width: 1200px;
  }
`;

const UnderSection = styled(Row)`
  margin : 0 !important;
`;

const P5Col = styled(Col)`
  padding : 0 10px 0 5px !important;
  
  @media (max-width: 1200px) {
      display : none;
  }
`;

const P5Col2 = styled(Col)`
  padding : 0 5px 0 5px !important;
  
  flex: 0 0 83.333333% !important;
  max-width: 83.333333% !important;
  
  @media (max-width: 1200px) {
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }
`;

export default memo(observer(App));
