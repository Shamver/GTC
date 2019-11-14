import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router';
import { observer } from 'mobx-react';
import Main from '../Content/Main';
import Posting from '../Content/Posting';
import PostList from '../Content/PostList';
import Alert from '../util/Alert';
import { useStores } from '../../stores/useStores';

const Content = () => {
  const { ContentStore } = useStores();
  console.log(ContentStore.history);
  // 1.useEffect 를 경로가 바뀔때마다 실행하게 되야함.
  // 3.useEffect 는 componentDidMount 와 componentDidUpdate 둘다 호출된다고 가정하면됨.
  // 4.즉 결론을 이 Content.js 를  경로가바뀔때마다 '업데이트' 해야함.
  // 5.
  useEffect(() => {
    console.log(ContentStore.history.location.pathname);
  }, [ContentStore]);
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Main />} />
        <Route exact path="/tempPost" render={() => <Posting />} />
        <Route exact path="/tempBoard" render={() => <PostList />} />
      </Switch>
      <Route path="/" render={() => <Alert />} />
    </>
  );
};


export default observer(Content);
