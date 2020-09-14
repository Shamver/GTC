import React, { memo } from 'react';
import {
  TabPane, Row, Col,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';
import PostLockerFavoriteTable from './PostLockerFavoriteTable';
import Pagination from './Pagination';

const PostLockerFavorite = ({ currentPage, noPagination, currentTab }) => {
  const { UserFavoriteStore } = useStores();
  const { myFavoriteList, favoriteMaxPage } = UserFavoriteStore;
  const FavoriteTableData = myFavoriteList.map(
    (v) => <PostLockerFavoriteTable data={v} key={v.postId} />,
  );

  return (
    <TabPane tabId="favorite">
      <Wrapper size="sm">
        <Row className="content-header">
          <Col className="col-sm-12">
            <TableHeader>
              <ColCell className="col-1 center">
                번호
              </ColCell>
              <ColCell className="col-5">
                제목
              </ColCell>
              <ColCell className="col-3">
                작성일
              </ColCell>
              <ColCell className="col-2">
                조회수
              </ColCell>
              <ColCell className="col-1 center">
                관리
              </ColCell>
            </TableHeader>
          </Col>
        </Row>

        {FavoriteTableData.length === 0 ? (
          <TableBody>
            <div className="center">
              <ColCell className="col-12">
                즐겨찾기한 게시물이 없습니다.
              </ColCell>
            </div>
          </TableBody>
        ) : FavoriteTableData}
      </Wrapper>
      {favoriteMaxPage !== 0
        ? (
          <Pagination
            currentPage={currentPage}
            noPagination={noPagination}
            path={currentTab}
            maxPage={favoriteMaxPage}
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
  
  @media (max-width: 800px) {
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

PostLockerFavorite.propTypes = {
  currentPage: Proptypes.string.isRequired,
  currentTab: Proptypes.string.isRequired,
  noPagination: Proptypes.bool.isRequired,
};

export default memo(observer(PostLockerFavorite));
