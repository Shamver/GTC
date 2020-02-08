import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import { observer } from 'mobx-react';
import useStores from '../../../../stores/useStores';

const Post = ({ data, index }) => {
  const {
    ComponentPostStore, UtilAlertStore, UserStore, UserIgnoreStore,
  } = useStores();
  const {
    id, title, writer, date, categoryName, recommendCount, replyCount,
    type, idWriter,
  } = data;
  const { dropdown, onActive } = ComponentPostStore;
  const { toggleConfirmAlert } = UtilAlertStore;
  const { userData } = UserStore;
  const { addIgnore } = UserIgnoreStore;

  return (
    <tr height="35" key={data.id}>
      <CenterTd width="50">
        {recommendCount > 0 ? <LikeCountSpan>{recommendCount}</LikeCountSpan> : ''}
      </CenterTd>
      <CenterTd>
        { type !== 'notice' ? categoryName : ''}
      </CenterTd>
      <MiddleTd width="700">
        { type !== 'notice' ? (<FontAwesomeIcon icon={faCommentDots} />) : (<FontAwesomeIcon icon={faInfoCircle} />)}
        &nbsp;
        <PostTitle to={`/post/${id}`}>{title}</PostTitle>
        { replyCount > 0 ? (<ReplyCountspan>&nbsp;&nbsp;&nbsp;[{replyCount}]</ReplyCountspan>) : ''}
      </MiddleTd>
      <CenterTdWriter>
        <WriterDropdown isOpen={dropdown[`replyIndex${index}`]} toggle={onActive}>
          <WriterDropdownToggle name={`replyIndex${index}`}> {writer} </WriterDropdownToggle>
          <WriterDropdownMenu>
            <WriterDropdownItem>
              프로필
            </WriterDropdownItem>
            <WriterDropdownItem>
              작성 글 보기
            </WriterDropdownItem>
            {userData.id === idWriter ? '' : (
              <WriterDropdownItem
                onClick={() => {
                  toggleConfirmAlert('정말 차단하시겠습니까?', () => {
                    addIgnore(idWriter);
                  });
                }}
              >
                차단하기
              </WriterDropdownItem>
            )}
          </WriterDropdownMenu>
        </WriterDropdown>
      </CenterTdWriter>
      <CenterTd>{date}</CenterTd>
    </tr>
  );
};

Post.propTypes = {
  data: Proptypes.shape({
    id: Proptypes.number,
    title: Proptypes.string,
    writer: Proptypes.string,
    date: Proptypes.string,
    categoryName: Proptypes.string,
    recommendCount: Proptypes.number,
    replyCount: Proptypes.number,
    type: Proptypes.string,
    idWriter: Proptypes.number,
  }).isRequired,
  index: Proptypes.number.isRequired,
};

const WriterDropdown = styled(Dropdown)`
  display : inline;
  
  & .dropdown-item:active {
    color: #fff !important;
    text-decoration: none !important;
    background-color: #DC3545 !important;
  }
  
   & .dropdown-item:focus {
    color: #fff !important;
    text-decoration: none !important;
    background-color: #DC3545 !important;
  }
`;

const WriterDropdownItem = styled(DropdownItem)`
  height : 27px;
  line-height : 0;
  padding-top : 0px;
  padding-bottom : 0px;
  font-size: 0.8rem;
`;

const WriterDropdownMenu = styled(DropdownMenu)`
  left: 20px !important;
`;

const WriterDropdownToggle = styled(DropdownToggle)`
  color : #DC3545 !important;
  font-weight : bold;
  font-size : 0.8rem !important;
  padding: 0 6px !important;
  background-color: transparent !important;
  border : 0 !important;
  height : 100%;
  &:focus {
    box-shadow : none !important;
  }
`;

const ReplyCountspan = styled.span`
  color: #DC3545;
  font-weight: bold;
`;

const LikeCountSpan = styled.span`
  background-color : #DC3545;
  color: #fff;
  font-weight: bold;
  padding: 2.5px 5px;
  font-size: 11px;
  border-radius: 100px;
`;

const PostTitle = styled(Link)`
  cursor: pointer
  color : black;
  
  &:hover {
    text-decoration: none;
  }
`;

const MiddleTd = styled.td`
  padding : 8px 9px 2px 10px !important;
  font-size : 13px;
`;

const CenterTd = styled(MiddleTd)`
  text-align : center;
`;

const CenterTdWriter = styled(CenterTd)`
  color : #DC3545;
  font-weight : bold;
`;

export default observer(Post);
