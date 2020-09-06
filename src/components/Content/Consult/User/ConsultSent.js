import React, { memo, useState } from 'react';
import {
  TabPane, Row, Col, Collapse, Card, CardBody,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import * as Proptypes from 'prop-types';
import useStores from '../../../../stores/useStores';
import Pagination from '../Pagination';

const ConsultSentRow = (props) => {
  const {
    onClickRow, isOpen, data, userData,
  } = props;
  const {
    subject, date, answerFl, consultDesc, answerDesc, category,
  } = data;
  const { username } = userData;

  return (
    <>
      <Row>
        <ColItem onClick={() => onClickRow(data.id)} className={isOpen ? 'col-sm-12 head active' : 'col-sm-12 head'}>
          <TableRow className="table-row">
            <div className="responsive-wrap">
              <ColCell className="col-sm-2 col-xs-3 category">
                {category}
              </ColCell>
              <ColCell className="col-sm-6 col-xs-4 subject">
                {subject}
              </ColCell>
            </div>
            <div className="responsive-wrap">
              <ColCell className="col-sm-2 col-xs-3 date">
                {date}
              </ColCell>
              <ColCell className="col-sm-2 col-xs-2 result">
                <CustomFontAwesome icon={answerFl ? faCheckCircle : faTimesCircle} color={answerFl ? 'green' : 'red'} />
                &nbsp;<Span className={answerFl ? 'color-green' : 'color-red'}>{answerFl ? '답변 완료' : '답변 대기'}</Span>
              </ColCell>
            </div>
          </TableRow>
        </ColItem>
      </Row>
      <ColItem className={isOpen ? 'col-sm-12 collapse-active' : 'col-sm-12 collapse-non-active'}>
        <Collapse isOpen={isOpen}>
          <Div>
            { username }
            <Card className="card-ask">
              <CardBody className="bg-ask">
                {consultDesc}
              </CardBody>
            </Card>
          </Div>
          <Div className="answer" answerFl={answerFl}>
            운영자
            <Card className="card-answer">
              <CardBody className="bg-answer new-line">
                {
                  answerFl
                    ? answerDesc
                    : (<Span className="color-gray">아직 답변을 받지 않은 문의 입니다.</Span>)
                }
              </CardBody>
            </Card>
          </Div>
        </Collapse>
      </ColItem>
    </>
  );
};

const ConsultSent = ({
  currentTab, currentPage, noPagination,
}) => {
  const { UserStore, ConsultStore } = useStores();
  const { userData } = UserStore;
  const { myConsultList, maxPage } = ConsultStore;
  const [openId, setOpenId] = useState(null);

  const onClickRow = (id) => (id === openId ? setOpenId(null) : setOpenId(id));

  const consultList = myConsultList.map((v) => (
    <ConsultSentRow
      key={v.id}
      data={v}
      isOpen={v.id === openId}
      onClickRow={onClickRow}
      userData={userData}
    />
  ));

  return (
    <TabPane tabId="sent">
      <Wrapper>
        <Row>
          <Col className="col-sm-12 content-header">
            <TableHeader>
              <ColCell className="col-sm-2 col-xs-3">
                종류
              </ColCell>
              <ColCell className="col-sm-6 col-xs-4">
                제목
              </ColCell>
              <ColCell className="col-sm-2 col-xs-3">
                날짜
              </ColCell>
              <ColCell className="col-sm-2 col-xs-2">
                답변 여부
              </ColCell>
            </TableHeader>
          </Col>
        </Row>
        { consultList }
        { consultList.length ? (
          <Pagination
            currentPage={currentPage}
            noPagination={noPagination}
            path={currentTab}
            maxPage={maxPage}
          />
        ) : ''}
      </Wrapper>
    </TabPane>
  );
};

ConsultSentRow.propTypes = {
  onClickRow: Proptypes.func.isRequired,
  isOpen: Proptypes.bool.isRequired,
  data: Proptypes.shape({
    id: Proptypes.number,
    subject: Proptypes.string,
    date: Proptypes.string,
    answerFl: Proptypes.number,
    consultDesc: Proptypes.string,
    answerDesc: Proptypes.string,
    category: Proptypes.string,
  }).isRequired,
  userData: Proptypes.shape({
    username: Proptypes.string,
  }).isRequired,
};

ConsultSent.propTypes = {
  currentPage: Proptypes.string.isRequired,
  currentTab: Proptypes.string.isRequired,
  noPagination: Proptypes.bool.isRequired,
};

const Wrapper = styled.div`
  padding: 0px 1rem;
  
  & .content-header {
    border-bottom: 1px solid #dee2e6;
  }
  
  @media (max-width: 578px) {
    & .content-header {
      display: none;
    }
    
    & .content-body {
      display: block;
    }
    
    & .table-row {
      flex-direction: column;
    }
    
    .category, .date {
      color: #999999;
    }
    
    .col {
      max-width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
`;

const TableHeader = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
`;

const TableRow = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  
  &:last-child {
    border-bottom: 1px solid #dee2e6 !important;
  }
  
  & .responsive-wrap {
    display: contents;
  }
  
  @media (max-width: 578px) {
    & .responsive-wrap {
      display: block;
    }
    
    & .responsive-wrap > div {
      display: inline;
      padding-right: 0;
      line-height: 28px;
      font-size: 14px;
    }
  }
`;

const ColCell = styled(Col)`
  padding: 6px;
  
  &.head, &.collapse-non-active {
    border: none;
  }
  &.collapse-active {
    border: 1px solid;
  }
  &.active {
    background-color: #d9d9d9;
  }
  &.head:hover {
    background-color: #d9d9d9;
    cursor: pointer;
  }
  
  @media (max-width: 578px) {
    &{
      height: 40px;
    }
  }
  
`;

const ColItem = styled(Col)`
  border: 1px solid #dee2e6;
  
  &.head, &.collapse-non-active {
    border: none;
  }
  &.collapse-active {
    border: 1px solid #dee2e6;
  }
  &.active {
    background-color: #d9d9d9;
  }
  &.head:hover {
    background-color: #d9d9d9;
    cursor: pointer;
  }
`;

const CustomFontAwesome = styled(FontAwesomeIcon)`
  padding-top: 2px;
`;

const Span = styled.span`
  &.color-red {
    color: red;
  }
  &.color-green {
    color: green;
  }
  &.color-gray {
    color: gray;
  }
`;

const Div = styled.div`
  padding: 1rem;
  width: 100%;
  
  &.answer {
    text-align: right;
  }
  
  & .card-ask {
    margin-right: 20%;
  }
  
  & .card-answer {
    margin-left: 20%;
  }
  
  & .bg-ask {
    background-color: #ededed;
  }
  
  & .bg-answer {
    background-color: ${(props) => (props.answerFl ? '#deffec' : '#ffdede')};
  }
  
  & .new-line {
    white-space: normal;
    text-align: left;
  }
`;

export default memo(observer(ConsultSent));
