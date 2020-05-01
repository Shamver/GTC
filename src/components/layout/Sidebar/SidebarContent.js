import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import FavoriteDropdown from './FavoriteDropdown';
import PlayDropdown from './PlayDropdown';
import LatelyDropdown from './LatelyDropdown';
import useStores from '../../../stores/useStores';
import ProfileDropdown from './ProfileDropdown';

const SidebarContent = () => {
  const { UtilStore } = useStores();
  const { sidebarOpen } = UtilStore;

  return (
    <>
      <HeaderWrapper>
        <TopWrapper>
          <LeftSpan>
            <TopIcon icon={faBars} />
          </LeftSpan>
          <RightSpan>
            <ProfileDropdown />
          </RightSpan>
        </TopWrapper>
        <br />
        <LatelyDropdown />
        <FavoriteDropdown />
        <PlayDropdown />
        <br />
      </HeaderWrapper>
      <MiddleLabel open={sidebarOpen}>
        GTC 전체 메뉴
      </MiddleLabel>
      <BottomMenu>
        <MarginlessRow>
          <Col xs="6">
            <LinkNoDeco to="/all">
              전체 글 보기
            </LinkNoDeco>
            <Hr />
            <StylelessUl>
              <MarginList>
                <LinkNoDeco to="/free">
                  자유게시판
                </LinkNoDeco>
              </MarginList>
              <MarginList>
                <LinkNoDeco to="/trade">
                  아이템 거래
                </LinkNoDeco>
              </MarginList>
              <MarginList>
                <LinkNoDeco to="/cash">
                  월드락 거래
                </LinkNoDeco>
              </MarginList>
              <MarginList>
                <LinkNoDeco to="/crime">
                  신고 게시판
                </LinkNoDeco>
              </MarginList>
            </StylelessUl>
          </Col>
          <Col xs="6">
            <LinkNoDeco to="/notice">
              공지사항
            </LinkNoDeco>
            <Hr />
            <StylelessUl>
              <MarginList>
                <LinkNoDeco to="/qna">
                  질문 & 답변
                </LinkNoDeco>
              </MarginList>
              <MarginList>
                <LinkNoDeco to="/faq">
                  자주 묻는 질문
                </LinkNoDeco>
              </MarginList>
              <MarginList>
                <LinkNoDeco to="/consult">
                  1:1 문의
                </LinkNoDeco>
              </MarginList>
            </StylelessUl>
          </Col>
        </MarginlessRow>
      </BottomMenu>
    </>
  );
};

const LinkNoDeco = styled(Link)`
  text-decoration: none !important;
  color : white;
  transition : all 0.25s;
  &:hover {
    color : #e6e6e6;
  }
`;

const MarginList = styled.li`
  margin : 5px 0px;
`;

const StylelessUl = styled.ul`
  list-style: none;
  padding: 0px !important;
`;

const MarginlessRow = styled(Row)`
  margin : 0 !important; 
`;

const Hr = styled.hr`
  background-color : #f3f2f0;
`;

const BottomMenu = styled.div`
  font-size : 16px;
`;

const MiddleLabel = styled.div`
  background-color : white;
  color : black;
  padding: 5px 12px;
  margin-bottom : 10px;
  font-size : 16px;
  box-shadow : ${(props) => (props.open ? '0px 0px 10px rgba(0,0,0,.5)' : 'none')};
`;

const TopIcon = styled(FontAwesomeIcon)`
  vertical-align : top;
`;

const TopWrapper = styled.div`
  margin-bottom : 20px;
`;

const LeftSpan = styled.span`
  font-size : 22px;
  float: left;
  transition : all 0.25s;
  cursor : pointer;
  &:hover {
    color : #e6e6e6;
  }
`;

const RightSpan = styled.span`
  float : right;
  cursor : pointer;
  transition : all 0.25s;
  &:hover {
    color : #e6e6e6;
  }
`;

const HeaderWrapper = styled.div`
  font-size : 16px;
  padding : 10px;
`;

export default observer(SidebarContent);
