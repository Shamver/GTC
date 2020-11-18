import React, { memo } from 'react';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../../../stores/useStores';
import PostRow from './responsive/PostRow';
import ResponsivePostRow from './responsive/ResponsivePostRow';

const Post = ({ data, index, isNotice }) => {
  const { BoardPostStore, ComponentPostStore } = useStores();
  const { postView } = BoardPostStore;
  const { onClickPost } = ComponentPostStore;
  const { id: currentPostId } = postView;
  const { id, date, recommendCount } = data;
  const RecommentComponent = recommendCount > 0
    && (<LikeCountSpan>{recommendCount}</LikeCountSpan>);
  const NoticeComponent = isNotice ? (<span>공지</span>) : RecommentComponent;
  const noticeStyle = isNotice ? '#ffd7d4' : '#ffffff';

  return (
    <>
      {/* 데스크톱 화면에서의 로우 */}
      <TableRow height="35" backgroundColor={currentPostId === id ? '#fff9e5' : noticeStyle}>
        <CenterTd width={3}>
          {currentPostId === id ? '>>' : NoticeComponent}
        </CenterTd>
        {/* 데스크톱 화면에서의 로우 */ }
        <PostRow data={data} index={index} isNotice={isNotice} />
        {/* 모바일 화면에서의 로우 */}
        <DateTd width={4}>
          <BlockInner>{date}</BlockInner>
        </DateTd>
      </TableRow>
      {/* 모바일 화면에서의 로우 */}
      <MobileTableRow height="50" backgroundColor={currentPostId === id ? '#fff9e5' : noticeStyle} onClick={() => onClickPost(id)}>
        <CenterTd width={5}>
          {currentPostId === id ? '>>' : NoticeComponent}
        </CenterTd>
        <ResponsivePostRow data={data} index={index} isNotice={isNotice} />
        <DateTd width={5}>
          <BlockInner>{date}</BlockInner>
        </DateTd>
      </MobileTableRow>
    </>
  );
};

Post.propTypes = {
  data: Proptypes.shape({
    id: Proptypes.number,
    date: Proptypes.string,
    recommendCount: Proptypes.number,
  }).isRequired,
  index: Proptypes.number.isRequired,
  isNotice: Proptypes.bool,
};

Post.defaultProps = {
  isNotice: false,
};

const BlockInner = styled.span`
  display : block;
  margin : auto;
  line-height : normal;
`;

const TableRow = styled.tr`
  background-color : ${(props) => props.backgroundColor};
  &:hover {
    background-color: rgb(250, 250, 250) !important;
  }
  @media (max-width: 992px) {
    display : none !important;
  }
`;

const MobileTableRow = styled.tr`
  background-color : ${(props) => props.backgroundColor};
  cursor: pointer;
  &:hover {
    background-color: rgb(250, 250, 250) !important;
  }
  display: none !important;
  @media (max-width: 992px) {
    display : table-row !important;
  }
  
  ${BlockInner} {
    font-size: 8px;
  }
`;

const LikeCountSpan = styled.span`
  display : inline-block;
  background-color : #DC3545;
  color: #fff;
  font-weight: bold;
  padding : 1px 6px;
  border-radius: 50%;
  font-size: 10px;
`;

const PercentTd = styled.td`
  width: ${(props) => props.width}% !important;
`;

const DateTd = styled(PercentTd)`
  white-space : pre;
  text-align : center;
  vertical-align : middle !important;
  padding : 0 0.5rem !important;
`;

const MiddleTd = styled(PercentTd)`
  padding : 0px 0.5rem !important;
  vertical-align : middle !important;
  font-size : 14px; 
`;

const CenterTd = styled(MiddleTd)`
  text-align: center;
  white-space: nowrap;
`;

export default memo(observer(Post));
