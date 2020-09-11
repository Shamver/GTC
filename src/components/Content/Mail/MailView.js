import React, { memo } from 'react';
import {
  Button, Col, Row, TabPane,
} from 'reactstrap';
import styled from 'styled-components';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';

const MailView = () => {
  const { UserMailStore, UserStore, ComponentMailStore } = useStores();
  const { viewMail, deleteMail } = UserMailStore;
  const { userData } = UserStore;
  const { setTab } = ComponentMailStore;

  if (viewMail.id === undefined) {
    setTab('get');
  }

  const {
    id, message, targetName, date, readDate, fromName,
  } = viewMail;

  return (
    <TabPane tabId="view">
      <Wrapper size="sm">
        <Row className="content">
          <Col className="col-sm-12">
            <RowContent className="mail-info">
              <ColDiv className="col-6">
                <span className="title">
                  보낸 사람
                </span>
                <span>
                  {fromName || userData.username}
                </span>
              </ColDiv>
              <ColDiv className="col-6">
                <span className="title">
                  받는 사람
                </span>
                <span>
                  {targetName || userData.username}
                </span>
              </ColDiv>
            </RowContent>
            <RowContent class="mail-info">
              <ColDiv className="col-6 date">
                <span className="title">
                  보낸 시간
                </span>
                <span>
                  {date}
                </span>
              </ColDiv>
              <ColDiv className="col-6 date">
                <span className="title">
                  읽은 시간
                </span>
                <span>
                  {readDate || '-'}
                </span>
              </ColDiv>
            </RowContent>
            <RowContent>
              <ColDiv className="col-12 message">
                {message}
              </ColDiv>
            </RowContent>
            <RowContent>
              <ColDiv className="col-12 func">
                {!targetName && (
                  <CustomBtn color="primary" size="sm" onClick={() => setTab('send', fromName)}>
                    <FontAwesomeIcon icon={faTelegramPlane} size="lg" /> 답장하기
                  </CustomBtn>
                )}
                &nbsp;
                {!(readDate || fromName) && (
                  <CustomBtn outline color="danger" size="sm" onClick={() => deleteMail(id)}>
                    <FontAwesomeIcon icon={faTrash} /> 삭제하기
                  </CustomBtn>
                )}
              </ColDiv>
            </RowContent>
          </Col>
        </Row>
      </Wrapper>
    </TabPane>
  );
};

MailView.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      id: Proptypes.string,
    }),
  }),
};

const CustomBtn = styled(Button)`
  margin: -5px 0 !important;
`;

const Wrapper = styled.div`
  padding: 0px 1rem;
  border: 1px solid #dee2e6;
  
  & .title {    
    color: #dc3545;
    padding: 2px 8px;
    border-radius: 12px;
    margin-right: 12px;
    font-size: 14px;
  }
  
  & .col {
    font-size: 14px;
    display: inline;
  }
  
  & .content {
    padding: 12px 0;
  }
  
  & .message {
    border-top: 1px solid #dee2e6;
    padding-top: 12px;
  }
  
  & .func {
    margin-top: 20px;
  }
  
  @media (max-width: 740px) {
    & .title {    
      padding: 0;
      margin-right: 4px;
    }
    
    & .date {    
      flex: 0 0 100%;
      max-width: 100%;
      margin-bottom: 5px;
    }
    
    & .mail-info {
      margin-bottom: 5px !important;
    }
  }
`;

const RowContent = styled(Row)`
  margin-bottom: 12px;
`;

const ColDiv = styled(Col)`
`;

MailView.defaultProps = {
  match: null,
};

export default memo(observer(MailView));
