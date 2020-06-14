import React, { memo } from 'react';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../../stores/useStores';
import ResponsiveRow from './responsive/ResponsiveRow';

const Post = ({ data, index, isNotice }) => {
  const { BoardPostStore } = useStores();
  const { currentPostId } = BoardPostStore;
  const { id, date, recommendCount } = data;


  return (
    <TableRow height="35" currentPostId={currentPostId} postId={id}>
      <CenterTd width="50">
        {/* eslint-disable-next-line no-nested-ternary */}
        {currentPostId === id ? '>>'
          : isNotice ? (
            <span>공지</span>
          ) : (
            <>
              {recommendCount > 0 ? <LikeCountSpan>{recommendCount}</LikeCountSpan> : ''}
            </>
          )}
      </CenterTd>
      <ResponsiveRow data={data} index={index} isNotice={isNotice} />
      <DateTd>
        <BlockInner>{date}</BlockInner>
      </DateTd>
    </TableRow>
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

const DateTd = styled.td`
  white-space : pre;
  text-align : center;
  vertical-align : middle !important;
  padding : 0 0.5rem !important;
`;
// eslint-disable-next-line no-nested-ternary
const TableRow = styled.tr`
  background-color : ${(props) => (props.currentPostId === props.postId ? '#fff9e5;'
    : (props.isNotice ? '#ffd7d4' : 'white'))};
  &:hover {
    background-color: rgb(250, 250, 250) !important;
  }
`;

const LikeCountSpan = styled.span`
  display : block;
  background-color : #DC3545;
  color: #fff;
  font-weight: bold;
  padding: 1px 5px;
  font-size: 10px;
  border-radius: 100px;
`;

const MiddleTd = styled.td`
  padding : 0px 0.5rem !important;
  vertical-align : middle !important;
  font-size : 14px;
`;

const CenterTd = styled(MiddleTd)`
  text-align : center;
`;

export default memo(observer(Post));
