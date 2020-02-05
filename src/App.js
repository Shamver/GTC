import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Header from './components/layout/Header';
import Content from './components/layout/Content';
import Category from './components/layout/Category';
import useStores from './stores/useStores';

const App = ({ history }) => {
  const { UtilRouteStore, UserStore } = useStores();
  const { setRoute } = UtilRouteStore;
  const { cookieCheck } = UserStore;

  setRoute(history);
  cookieCheck();

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
      <LayoutFooter>
        © 2020-2020 GTC(Growtopia Community) <br />
        <Link to="/">이용약관</Link>
        &nbsp; | &nbsp;
        <Link to="/">개인정보보호방침</Link>
        &nbsp; | &nbsp;
        <Link to="/">관리자 모집</Link>
        &nbsp; | &nbsp;
        <Link to="/">광고문의</Link>
        &nbsp; | &nbsp;
        <Link to="/">고객센터</Link> <br />
        GTC(Growtopia Community)는 Growtopia에서 운영하는 사이트가 아닙니다. <br />
        <br />
        <Link to="/">모바일버전으로 전환하기</Link>
      </LayoutFooter>
    </ContainerWrapper>
  );
};

App.propTypes = {
  history: Proptypes.shape({}).isRequired,
};

const LayoutFooter = styled.div`
  text-align : center;
  padding-top : 20px;
  padding-bottom : 40px;
  font-size : 14px;
`;

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
  min-height : 100vh;
`;

const UnderSection = styled(Row)`
  margin : 0 !important;
`;

const P5Col = styled(Col)`
  padding : 0 10px 0 5px !important;
`;

const P5Col2 = styled(Col)`
  padding : 0 5px 0 5px !important;
`;

export default observer(App);
