import React from 'react';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../../stores/useStores';
import ResponsiveRow from './responsive/ResponsiveRow';

const Post = ({
  data, index, path, isNotice = false,
}) => {
  const { BoardPostStore } = useStores();
  const { currentPostId } = BoardPostStore;
  const { id, date, recommendCount } = data;

  return (
    <TableRow height="35" key={data.id} currentPostId={currentPostId} postId={id} isNotice={isNotice}>
      <CenterTd width="50">
        {currentPostId === id ? '>>'
          : isNotice ? (
            <>
              <span>공지</span>
            </>
          ) : (
            <>
              {recommendCount > 0 ? <LikeCountSpan>{recommendCount}</LikeCountSpan> : ''}
            </>
          )}
      </CenterTd>
      <ResponsiveRow data={data} index={index} path={path} isNotice={isNotice} />
      <DateTd>{date}</DateTd>
    </TableRow>
  );
};

Post.propTypes = {
  data: Proptypes.shape({
    id: Proptypes.number,
    title: Proptypes.string,
    writerName: Proptypes.string,
    date: Proptypes.string,
    categoryName: Proptypes.string,
    recommendCount: Proptypes.number,
    commentCount: Proptypes.number,
    type: Proptypes.string,
    writerId: Proptypes.number,
  }).isRequired,
  index: Proptypes.number.isRequired,
  path: Proptypes.string.isRequired,
  isNotice: Proptypes.bool.isRequired,
};

const DateTd = styled.td`
  white-space : pre;
  text-align : center;
  vertical-align : inherit !important;
  padding : 0.5rem 0.8rem !important;
`;

const TableRow = styled.tr`
  background-color : ${(props) => (props.currentPostId === props.postId ? '#fff9e5;'
    : (props.isNotice ? '#ffd7d4' : 'white'))};
  &:hover {
    background-color: ${(props) => (props.isNotice ? '#ffd7d4' : '#fff7d9')} !important;
  }
`;

const LikeCountSpan = styled.span`
  background-color : #DC3545;
  color: #fff;
  font-weight: bold;
  padding: 2.5px 5px;
  font-size: 11px;
  border-radius: 100px;
`;

const MiddleTd = styled.td`
  padding : 8px 9px 2px 10px !important;
  font-size : 13px;
`;

const CenterTd = styled(MiddleTd)`
  text-align : center;
`;

export default observer(Post);
