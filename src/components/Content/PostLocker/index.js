import React, { useLayoutEffect, memo } from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';
import PostLockerNav from './PostLockerNav';
import PostLockerTabContent from './PostLockerTabContent';

const PostLocker = ({ currentPage, noPagination, currentTab }) => {
  const {
    BoardPostStore, BoardReplyStore, UserFavoriteStore,
    UtilLoadingStore,
  } = useStores();

  const { getPostMine } = BoardPostStore;
  const { getDataReplyMine } = BoardReplyStore;
  const { getFavorite } = UserFavoriteStore;
  const { loadingProcess } = UtilLoadingStore;

  useLayoutEffect(() => {
    loadingProcess([
      () => getPostMine(currentPage),
      () => getDataReplyMine(currentPage),
      getFavorite,
    ]);
  }, [
    loadingProcess, getDataReplyMine, getPostMine, getFavorite, currentTab, currentPage,
  ]);

  return (
    <MainContainer>
      <PostLockerNav currentTab={currentTab} />
      <PostLockerTabContent
        currentPage={currentPage}
        noPagination={noPagination}
        currentTab={currentTab}
      />
    </MainContainer>
  );
};

const MainContainer = styled(Container)`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color: white;
  padding: 14px !important;
`;

PostLocker.propTypes = {
  currentPage: Proptypes.string,
  currentTab: Proptypes.string,
  noPagination: Proptypes.bool,
};

PostLocker.defaultProps = {
  currentPage: '1',
  currentTab: 'myPost',
  noPagination: false,
};

export default memo(observer(PostLocker));
