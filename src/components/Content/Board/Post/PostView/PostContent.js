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
  const { postReplyList, setReplyOption } = BoardReplyStore;
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
  const { id: upperId, title: upperTitle, writer: upperWriter } = upper;
  const { id: lowerId, title: lowerTitle, writer: lowerWriter } = lower;
  const { addFavorite, deleteFavorite } = UserFavoriteStore;

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

const MiddleIcon = styled(FontAwesomeIcon)`
  vertical-align : sub;
`;

const Div = styled.div`
  display: ${(props) => (props.loading ? 'none' : 'block')}
`;

const GreyButton = styled(Button)`
  background-color : white !important;
  border-color: #ccc !important;
  color : black !important;
  &:hover {
    background-color : #e6e6e6 !important;
  }
  
  color: ${(props) => (props.outline ? 'black' : 'white')};
`;

const TopBottomLink = styled(Link)`
  color : inherit !important;
  text-decoration : none;
  
  &:hover {
    text-decoration : none !important; 
  }
`;

const ListLink = styled(Link)`
  color : #6c757d;
  text-decoration : none;
  
  &:hover {
    color : white;
    text-decoration : none;
  }
`;



const TopBottomWrapper = styled.div`
  margin-top : 50px;
  font-size : 14px;
  
  & div {
    padding : 2px 0px;
  }
  
  & div:hover {
    background-color : #fafafa;
  }
`;

const TopBottomWriter = styled.span`
  float : right;
  color : #aaa;
  font-weight : bold;
`;

const TopBottomDiv = styled.div`
  width : 80px;
  display : inline-block;
  font-weight : bold;
`;

const TextCenterDiv = styled.div`
  text-align : center;
`;

const SmallFontButton = styled(Button)`
  font-size : 14px !important;
`;

const ViewWrapper = styled.div`
  padding : 20px;
  font-size : 13px !important;
  @media (max-width: 992px) {
    padding : 20px 7px !important;
  }
`;



const NavLine = styled.hr`
  background :#DC3545;
  border : 0;
  height : 2px;
  margin-top : 7px;
  margin-bottom : 0;
`;

const InnerContainer = styled(Container)`
  margin : 0 !important;
  padding : 0 3px !important;
  height : 35px;
  max-width : none !important;
  background: #f6f6f6;
  padding: 0.6em 0.8em !important;
`;

const InnerFooterContainer = styled(InnerContainer)`
  height : 47px;
`;

const PostViewWrapper = styled.div`
  border-left: 1px solid #f1f1f1;
  border-right: 1px solid #f1f1f1;
  margin-bottom : 20px;
`;



const RightSpan = styled.span`
  margin-left : 5px;
  float : right;
`;

const ContentWrapper = styled.div`
  padding : 14px;
`;

export default observer(PostContent);
