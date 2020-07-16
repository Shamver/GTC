import React, { memo, useLayoutEffect } from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';
import PostLockerNav from './PostLockerNav';
import PostLockerTabContent from './PostLockerTabContent';

const PostLocker = ({ match, noPagination }) => {
  const {
    BoardPostStore, BoardReplyStore, UserFavoriteStore,
    UtilLoadingStore,
  } = useStores();

  const { getPostMine } = BoardPostStore;
  const { getDataReplyMine } = BoardReplyStore;
  const { getMyFavorite } = UserFavoriteStore;
  const { loadingProcess } = UtilLoadingStore;

  const { currentPage = 1, currentTab = 'myPost' } = match.params;

  useLayoutEffect(() => {
    loadingProcess([
      () => getPostMine(currentPage),
      () => getDataReplyMine(currentPage),
      () => getMyFavorite(currentPage),
    ]);
  }, [
    loadingProcess, getDataReplyMine, getPostMine, getMyFavorite, currentTab, currentPage,
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
  match: Proptypes.shape({
    params: Proptypes.shape({
      currentPage: Proptypes.string,
      currentTab: Proptypes.string,
    }).isRequired,
  }).isRequired,
  noPagination: Proptypes.bool,
};

PostLocker.defaultProps = {
  noPagination: false,
};

export default memo(observer(PostLocker));
