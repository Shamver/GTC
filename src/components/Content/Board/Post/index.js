import React from 'react';
import * as Proptypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import useStores from '../../../../stores/useStores';
import ResponsiveRow from './responsive/ResponsiveRow';

const Post = ({ data, index }) => {
  const { BoardPostStore } = useStores();
  const { currentPostId } = BoardPostStore;
  const { id, date, recommendCount } = data;

  return (
    <TableRow height="35" key={data.id} currentPostId={currentPostId} postId={id}>
      <CenterTd width="50">
        {currentPostId === id ? (<BlockIcon icon={faAngleDoubleRight} />) : (
          <>
            {recommendCount ? <LikeCountSpan>{recommendCount}</LikeCountSpan> : null}
          </>
        )}
      </CenterTd>
      <ResponsiveRow data={data} index={index} />
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
};

const BlockInner = styled.span`
  display : block;
  margin : auto;
`;

const BlockIcon = styled(FontAwesomeIcon)`
  display : block;
  margin : auto auto;
`;

const DateTd = styled.td`
  white-space : pre;
  text-align : center;
  vertical-align : middle !important;
  padding : 0 !important;
`;

const TableRow = styled.tr`
  background-color : ${(props) => (props.currentPostId === props.postId ? '#fff9e5;' : 'white')}
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
  padding : 0px 5px !important;
  vertical-align : middle !important;
  font-size : 13px;
`;

const CenterTd = styled(MiddleTd)`
  text-align : center;
`;

export default observer(Post);
