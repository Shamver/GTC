import React, { memo } from 'react';
import { TabPane, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';
import PostLockerMyReplyTable from './PostLockerMyReplyTable';
import Pagination from './Pagination';

const PostLockerMyReply = ({ currentPage, noPagination, currentTab }) => {
  const { BoardReplyStore } = useStores();
  const { replyMineList, replyMineMaxPage } = BoardReplyStore;
  const MyReplyTableData = replyMineList.map(
    (v) => <PostLockerMyReplyTable data={v} key={v.replyId} />,
  );

  return (
    <TabPane tabId="myReply">
      <Wrapper size="sm">
        <Row className="content-header">
          <Col className="col-sm-12">
            <TableHeader>
              <ColCell className="col-4">
                글 제목
              </ColCell>
              <ColCell className="col-5">
                댓글 내용
              </ColCell>
              <ColCell className="col-3">
                작성일
              </ColCell>
            </TableHeader>
          </Col>
        </Row>
        {MyReplyTableData.length === 0 ? (
          <TableBody>
            <div className="center">
              <ColCell className="col-12">
                작성한 댓글이 없습니다.
              </ColCell>
            </div>
          </TableBody>
        ) : MyReplyTableData}
      </Wrapper>
      {replyMineMaxPage !== 0
        ? (
          <Pagination
            currentPage={currentPage}
            noPagination={noPagination}
            path={currentTab}
            maxPage={replyMineMaxPage}
          />
        ) : null}
    </TabPane>
  );
};

const Wrapper = styled.div`
  padding: 0px 1rem;
  border-bottom: 1px solid #dee2e6;
  
  & .content-header {
    border-bottom: 1px solid #dee2e6;
  }
  
  & .center {
    text-align: center;
  }
  
  @media (max-width: 740px) {
    & .content-header {
      display: none;
    }
    
    & .content-body {
      display: block;
    }
    
    .col {
      max-width: 100%;
    }
  }
`;

const TableHeader = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  
`;

const ColCell = styled(Col)`
  padding: 12px 6px;
`;

const TableBody = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  align-items: center;
  font-size: 14px;
`;

PostLockerMyReply.propTypes = {
  currentPage: Proptypes.string.isRequired,
  currentTab: Proptypes.string.isRequired,
  noPagination: Proptypes.bool.isRequired,
};

export default memo(observer(PostLockerMyReply));
