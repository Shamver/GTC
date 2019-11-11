import React from 'react';
import styled from 'styled-components';
import {
  Container, Row,
} from 'reactstrap';
import {
  faBars, faFlag, faList, faGlobeAsia, faTshirt, faLock, faQuestion, faComments, faAt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { inject, observer } from 'mobx-react';
import * as PropTypes from 'prop-types';

const MainContainer = styled(Container)`
  padding : 0px !important;
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
`;

const MenuWrapper = styled(Row)`
  margin : 0 !important;
  background-color :white;
`;

const MenuLink = styled.div`
  color: black;
  padding: 2px 0px;
  margin : 0 !important;
  width : 100%;
  margin-bottom: 0px !important;
  transition: all 0.18s;
  border-bottom : 1px solid #e6e6e6;
  
  background-color: ${
  (props) => (props.active ? '#ffd7d4' : '#fff')
}
  
  &:hover {
    background-color: #ffc8c4;
    cursor: pointer;
    text-decoration: none;
    color: black;
  }
  
  &:active {
    animation: bgcolor 3s;
    -webkit-animation: bgcolor 3s;
    
    @keyframes bgcolor {
      0% {background-color: #ffc8c4;}
      40% {background-color: #ff8b82;}
      80% {background-color: #ff2c1c;}
      100% {background-color: #ffd7d4;}
    }
    @-webkit-keyframes bgcolor {
      0% {background-color: #ffc8c4;}
      40% {background-color: #ff8b82;}
      80% {background-color: #ff2c1c;}
      100% {background-color: #ffd7d4;}
    }
  }
`;

const MenuRow = styled(Row)`
  padding: 0px 0px;
  margin : 0 !important;
  width : 100%;
  margin-bottom: 3px !important;
  transition: all 0.2s;
  &:hover {
    background-color: #ffd7d4;
    cursor: pointer;
  }
`;

const MenuDiv = styled.div`
  padding: 2px 12px;
  font-weight: 300;
`;

const MenuRowTop = styled(MenuRow)`
  background-color: #DC3545;
  padding : 2.5px 0px !important;
  margin : 0px !important;
  margin-bottom: 1px !important;
  &:hover {
    background-color: #DC3545;
    cursor: default;
  }
`;

const MenuDivTop = styled(MenuDiv)`
  font-weight: bold; 
  color: white;
`;

const FaiPink = styled(FontAwesomeIcon)`
  color: #f57c73;
`;

const Category = ({ CategoryStore }) => {
  const { category } = CategoryStore;

  return (
    <MainContainer>
      <MenuWrapper>
        <MenuRowTop>
          <MenuDivTop>
            <FontAwesomeIcon icon={faBars} className="fa-fw" />&nbsp;&nbsp; GTC 전체 메뉴
          </MenuDivTop>
        </MenuRowTop>
        <MenuLink active={category.active === 'notice'} onClick={() => CategoryStore.onActive('notice')}>
          <MenuDiv>
            <FaiPink icon={faFlag} className="fa-fw" />&nbsp;&nbsp; 공지사항
          </MenuDiv>
        </MenuLink>
        <MenuLink active={category.active === 'all'} onClick={() => CategoryStore.onActive('all')}>
          <MenuDiv>
            <FaiPink icon={faList} className="fa-fw" />&nbsp;&nbsp; 전체글 보기
          </MenuDiv>
        </MenuLink>
        <MenuLink active={category.active === 'free'} onClick={() => CategoryStore.onActive('free')}>
          <MenuDiv>
            <FaiPink icon={faGlobeAsia} className="fa-fw" />&nbsp;&nbsp; 자유 게시판
          </MenuDiv>
        </MenuLink>
        <MenuLink active={category.active === 'trade'} onClick={() => CategoryStore.onActive('trade')}>
          <MenuDiv>
            <FaiPink icon={faTshirt} className="fa-fw" />&nbsp;&nbsp; 아이템 거래
          </MenuDiv>
        </MenuLink>
        <MenuLink active={category.active === 'cash'} onClick={() => CategoryStore.onActive('cash')}>
          <MenuDiv>
            <FaiPink icon={faLock} className="fa-fw" />&nbsp;&nbsp; 월드락 거래
          </MenuDiv>
        </MenuLink>
        <MenuLink active={category.active === 'qna'} onClick={() => CategoryStore.onActive('qna')}>
          <MenuDiv>
            <FaiPink icon={faComments} className="fa-fw" />&nbsp;&nbsp; 질문&답변
          </MenuDiv>
        </MenuLink>
        <MenuLink active={category.active === 'faq'} onClick={() => CategoryStore.onActive('faq')}>
          <MenuDiv>
            <FaiPink icon={faQuestion} className="fa-fw" />&nbsp;&nbsp; 자주 묻는 질문
          </MenuDiv>
        </MenuLink>
        <MenuLink active={category.active === 'consult'} onClick={() => CategoryStore.onActive('consult')}>
          <MenuDiv>
            <FaiPink icon={faAt} className="fa-fw" />&nbsp;&nbsp; 1:1 문의
          </MenuDiv>
        </MenuLink>
      </MenuWrapper>
    </MainContainer>
  );
};

Category.propTypes = {
  CategoryStore: PropTypes.shape({
    category: PropTypes.shape({
      active: PropTypes.string,
    }),
    onActive: PropTypes.func,
  }),
};

Category.defaultProps = {
  CategoryStore: null,
};

export default inject('CategoryStore')(observer(Category));
