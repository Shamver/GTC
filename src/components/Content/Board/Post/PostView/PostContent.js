import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import { Container, Button, Row, Col } from 'reactstrap';
import {
  faClock, faEye, faBellSlash, faStar as farStar,
} from '@fortawesome/free-regular-svg-icons';
import {
  faCommentDots, faBars, faStar as fasStar, faThumbsUp, faThumbsDown, faHeart, faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import renderHTML from 'react-render-html';
import useStores from '../../../../../stores/useStores';
import ReplyForm from '../../Reply/ReplyForm';
import BoardContent from '../../BoardContent';
import BoardFooter from '../../BoardFooter';
import Loading from '../../../../util/Loading';
import anonymous from '../../../../../resources/images/anonymous.png';

const PostContent = ({ match }) => {
  const {
    BoardPostStore, BoardReplyStore, BoardStore, UtilLoadingStore, UserFavoriteStore,
    BoardReportStore, UtilAlertStore,
  } = useStores();
  const {
    postView, recommendPost, currentPostUpperLower, deletePost,
    setCurrentPostId,
  } = BoardPostStore;

  const { currentBoard } = BoardStore;
  const { toggleConfirmAlert } = UtilAlertStore;
  const { loading, doLoading } = UtilLoadingStore;
  const { toggleReport } = BoardReportStore;
  const {
    id: postId, boardName, categoryName, title, writerName, date, viewCnt, content,
    recommendCount, commentAllowFl, secretCommentAllowFl, notRecommendCount,
    isFavorite, isMyPost,
  } = postView;
  const { upper, lower } = currentPostUpperLower;



  useEffect(() => {
    setReplyOption(commentAllowFl, secretCommentAllowFl);
    setCurrentPostId(postId);
  }, [commentAllowFl, secretCommentAllowFl, setReplyOption, setCurrentPostId, postId, doLoading]);

  return (
    <ViewWrapper loading={loading}>
      <Loading loading={loading} />
      <Div loading={loading}>
      </Div>
    </ViewWrapper>
  );
};

PostContent.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      id: Proptypes.string,
    }),
  }),
};

PostContent.defaultProps = {
  match: null,
};


const Div = styled.div`
  display: ${(props) => (props.loading ? 'none' : 'block')}
`;



const ViewWrapper = styled.div`
  padding : 20px;
  font-size : 13px !important;
  @media (max-width: 992px) {
    padding : 20px 7px !important;
  }
`;






export default observer(PostContent);
