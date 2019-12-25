import React, { useEffect } from 'react';
import useStores from '../../stores/useStores';
import * as Proptypes from 'prop-types';

const PostView = ({ match }) => {
  const { BoardStore } = useStores();
  useEffect(() => {
    BoardStore.getPost(match.params.id);
  }, []);
  return (
    <div>ㅎㅇㅎㅇㅎㅇㅎ</div>

  );
};

PostView.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.object,
  }).isRequired,
  BoardStore: Proptypes.shape({
    getPost: Proptypes.func,
  }),
};

PostView.defaultProps = {
  BoardStore: null,
}
export default PostView;
