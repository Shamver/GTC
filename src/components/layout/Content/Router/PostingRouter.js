import React, { memo } from 'react';
import Contents from '../../../Content';
import AuthRouter from '../AuthRouter';

const PostingRouter = () => (
  <>
    <AuthRouter exact Component={Contents.Posting} level={1} path="/post" isModify={false} />
    <AuthRouter exact Component={Contents.Posting} level={1} path="/post/modify/:id" isModify />
  </>
);

export default memo(PostingRouter);
