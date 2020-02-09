import React from 'react';
import {
  TabContent,
} from 'reactstrap';

import { observer } from 'mobx-react';

import styled from 'styled-components';
import useStores from '../../../stores/useStores';

import PostLockerMyPost from './PostLockerMyPost';
import PostLockerMyReply from './PostLockerMyReply';
import PostLockerFavorite from './PostLockerFavorite';

import Loading from '../../util/Loading';

const PostLockerTabContent = () => {
  const { ComponentPostLockerStore, UtilLoadingStore } = useStores();
  const { activeTab } = ComponentPostLockerStore;
  const { loading } = UtilLoadingStore;

  return (
    <>
      <Loading loading={loading} />
      <Div loading={loading}>
        <TabContent activeTab={activeTab}>
          <PostLockerMyPost />
          <PostLockerMyReply />
          <PostLockerFavorite />
        </TabContent>
      </Div>
    </>
  );
};

const Div = styled.div`
  display: ${(props) => (props.loading ? 'none' : 'block')}
`;

export default observer(PostLockerTabContent);
