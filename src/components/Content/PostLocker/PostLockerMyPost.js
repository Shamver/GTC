import React, { memo } from 'react';
import {
  TabPane, Row, Col,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';
import PostLockerMyPostTable from './PostLockerMyPostTable';
import Pagination from './Pagination';

const PostLockerMyPost = ({ currentPage, noPagination, currentTab }) => {
  const { BoardPostStore } = useStores();
  const { postMineList, postMineMaxPage } = BoardPostStore;
  const MyPostTableData = postMineList.map(
    (v) => <PostLockerMyPostTable data={v} key={v.postId} />,
  );

  return (
    <TabPane tabId="myPost">
      <Wrapper size="sm">
        <Row className="content-header">
          <Col className="col-sm-12">
            <TableHeader>
              <ColCell className="col-1 center">
                번호
              </ColCell>
              <ColCell className="col-6">
                제목
              </ColCell>
              <ColCell className="col-3">
                작성일
              </ColCell>
              <ColCell className="col-2 center">
                조회수
              </ColCell>
            </TableHeader>
          </Col>
        </Row>
        {MyPostTableData.length === 0 ? (
          <TableBody>
            <div className="center">
              <ColCell className="col-12">
                작성한 글이 없습니다.
              </ColCell>
            </div>
          </TableBody>
        ) : MyPostTableData}
      </Wrapper>
      {postMineMaxPage !== 0
        ? (
          <Pagination
            currentPage={currentPage}
            noPagination={noPagination}
            path={currentTab}
            maxPage={postMineMaxPage}
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

PostLockerMyPost.propTypes = {
  currentPage: Proptypes.string.isRequired,
  currentTab: Proptypes.string.isRequired,
  noPagination: Proptypes.bool.isRequired,
};

export default memo(observer(PostLockerMyPost));
