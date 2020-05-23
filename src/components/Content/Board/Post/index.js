import React from 'react';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import useStores from '../../../../stores/useStores';
import ResponsiveRow from './responsive/ResponsiveRow';

const Post = ({ data, index, path }) => {
  const { BoardPostStore } = useStores();
  const { currentPostId } = BoardPostStore;
  const { id, date, recommendCount } = data;

  return (
    <TableRow height="35" key={data.id} currentPostId={currentPostId} postId={id}>
      <CenterTd width="40">
        {currentPostId === id ? (<BlockIcon icon={faAngleDoubleRight} />) : (
          <>
            {!!recommendCount && <LikeCountSpan>{recommendCount}</LikeCountSpan>}
          </>
        )}
      </CenterTd>
      <ResponsiveRow data={data} index={index} path={path} />
      <DateTd>
        <BlockInner>
          {date}
        </BlockInner>
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
  path: Proptypes.string.isRequired,
};

const BlockInner = styled.span`
  display : block;
  margin : auto;
  line-height : normal;
`;

const BlockIcon = styled(FontAwesomeIcon)`
  display : block;
  margin : auto auto;
`;

const DateTd = styled.td`
  white-space : pre;
  text-align : center;
  vertical-align : middle !important;
  padding : 0 0.5rem !important;
`;

const TableRow = styled.tr`
  background-color : ${(props) => (props.currentPostId === props.postId ? '#fff9e5;' : 'white')}
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

export default observer(Post);
