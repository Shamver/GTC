import React, { memo, useState } from 'react';
import {
  TabPane, Row, Col, Collapse, Card, CardBody,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import useStores from '../../../../stores/useStores';

const ConsultSentRow = (props) => {
  const { onClickRow, isOpen, data, userData } = props;
  const { subject, date, answerFl, text, answerText } = data;
  const { username } = userData;

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
      <ColItem className={isOpen ? 'col-sm-12 collapse-active' : 'col-sm-12 collapse-non-active'}>
        <Collapse isOpen={isOpen}>
          <Div>
            { username }
            <Card>
              <CardBody className="bg-ask">
                {text}
              </CardBody>
            </Card>
          </Div>
          <Div className="answer" answerFl={answerFl}>
            운영자
            <Card>
              <CardBody className="bg-answer">
                {
                  answerFl
                    ? answerText
                    : (<Span className="color-gray">아직 답변을 받지 않은 문의 입니다.</Span>)
                }
              </CardBody>
            </Card>
          </Div>
        </Collapse>
      </ColItem>
    </>
  )
};

const ConsultSent = () => {
  const { UserStore } = useStores();
  const { userData } = UserStore;

  const data = [
    {
      id: 1,
      subject: 's',
      text: 'ss',
      date: '2020-02-02',
      answerFl: 0,
      answerText: null,
    },
    {
      id: 2,
      subject: 's2',
      text: 'ss2',
      date: '2020-02-03',
      answerFl: 1,
      answerText: '이게 답변이다 임마',
    }
  ];
  const [openId, setOpenId] = useState(null);

  const onClickRow = (id) => id === openId ? setOpenId(null) : setOpenId(id);

  const test = data.map((v) =>
    <ConsultSentRow
      data={v}
      isOpen={v.id === openId}
      onClickRow={onClickRow}
      userData={userData}
    />
  );

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
    border-bottom: 1px solid;
  }
`;

const ColItem = styled(Col)`
  border: 1px solid;
  
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
  width: 70%;
  
  &.answer {
    float: right;
    text-align: right;
  }
  
  & .bg-ask {
    background-color: #ededed;
  }
  
  & .bg-answer {
    background-color: ${(props) => props.answerFl ? '#deffec' : '#ffdede'};
  }
`;

export default memo(observer(ConsultSent));
