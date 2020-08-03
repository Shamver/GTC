import React, { memo, useState } from 'react';
import {
  TabPane, Row, Col, Collapse,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ConsultSentRow = (props) => {
  const { onClickRow, isOpen, data } = props;
  const { subject, date, answerFl, text } = data;

  return (
    <>
      <ColItem onClick={() => onClickRow(data.id)} className={isOpen ? 'col-sm-12 head active' : 'col-sm-12 head'}>
        <Row>
          <ColItem className="col-sm-8">
            {subject}
          </ColItem>
          <ColItem className="col-sm-2">
            {date}
          </ColItem>
          <ColItem className="col-sm-2">
            <CustomFontAwesome icon={answerFl ? faCheckCircle : faTimesCircle} color={answerFl ? 'green' : 'red'} />
            &nbsp;<Span className={answerFl ? 'color-green' : 'color-red'}>{answerFl ? '답변 완료' : '답변 대기'}</Span>
          </ColItem>
        </Row>
      </ColItem>
      <Col className="col-sm-12">
        <Collapse isOpen={isOpen}>
          {text}
        </Collapse>
      </Col>
    </>
  )
};

const ConsultSent = () => {
  const data = [
    {
      id: 1,
      subject: 's',
      text: 'ss',
      date: '2020-02-02',
      answerFl: 0,
    },
    {
      id: 2,
      subject: 's2',
      text: 'ss2',
      date: '2020-02-03',
      answerFl: 1,
    }
  ];
  const [openId, setOpenId] = useState(null);

  const onClickRow = (id) => id === openId ? setOpenId(null) : setOpenId(id);

  const test = data.map((v) => <ConsultSentRow data={v} isOpen={v.id === openId} onClickRow={onClickRow} />)

  return (
    <TabPane tabId="sent">
      <Wrapper>
        <Row>
          <Col className="col-sm-12 content-header">
            <Row>
              <ColItem className="col-sm-8">
                제목
              </ColItem>
              <ColItem className="col-sm-2">
                날짜
              </ColItem>
              <ColItem className="col-sm-2">
                답변 여부
              </ColItem>
            </Row>
          </Col>
          { test }
        </Row>
      </Wrapper>
    </TabPane>
  );
};

const Wrapper = styled.div`
  padding: 6px 1rem;
  
  & .content-header {
    border: 1px solid;
  }
`;

const ColItem = styled(Col)`
  border: 1px solid;
  
  &.head {
  
  }
  &.active {
    background-color: gray;
  }
  &:hover {
    background-color: gray;
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
`;

export default memo(observer(ConsultSent));
