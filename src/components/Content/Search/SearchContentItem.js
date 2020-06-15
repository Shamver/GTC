import React, { memo } from 'react';
import { Col } from 'reactstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as Proptypes from 'prop-types';

const SearchContentItem = ({ data }) => {
  const {
    id, title, content, writerName, date, commentCount, isImage,
  } = data;

  const src = !isImage ? null : content.split('<figure class="image"><img src="')[1].split('"></figure>')[0];

  return (
    <Item sm={12}>
      <TableRow>
        {!isImage ? '' : (
          <TableCell img>
            <Img src={src} alt="a" />
          </TableCell>
        )}
        <TableCell>
          <div>
            <Link to={`/post/${id}`}>
              <Span link>{title}</Span>
            </Link>
            <ReplyCountSpan>&nbsp;[{commentCount}]</ReplyCountSpan>
          </div>
          <div>
            <Span small>{writerName}</Span>
            <Span small>&nbsp;|&nbsp;{date}</Span>
          </div>
          <div>{content}</div>
        </TableCell>
      </TableRow>
    </Item>
  );
};

SearchContentItem.propTypes = {
  data: Proptypes.shape({
    id: Proptypes.number,
    title: Proptypes.string,
    content: Proptypes.string,
    writerId: Proptypes.number,
    writerName: Proptypes.string,
    date: Proptypes.string,
    commentCount: Proptypes.number,
    isImage: Proptypes.bool,
  }).isRequired,
};

const Img = styled.img`
  width: 92px;
  height: 85px;
  vertical-align: middle;
`;

const TableRow = styled.div`
  display: table-row;
`;

const TableCell = styled.div`
  display: table-cell;
  vertical-align: middle;
  width: ${(props) => (props.img ? '102px' : 'auto')};
`;

const ReplyCountSpan = styled.span`
  font-size: 0.7rem;
  color: black;
  font-weight: 800;
`;

const Span = styled.span`
  color: ${(props) => (props.link ? 'default' : 'gray')};
  font-weight: ${(props) => (props.link ? '700' : 'default')};
  font-size: ${(props) => (props.small ? '0.9rem' : '1rem')};
`;

const Item = styled(Col)`
  border-bottom: 1px dotted #e2e2e2;
  border-bottom-width: 1px;
  border-bottom-style: dotted;
  border-bottom-color: rgb(226, 226, 226);
  padding: 6px 0 !important;
  display: table-cell;
  vertical-align: middle;
  
  &:hover {
    background-color: #fafafa;
  }
`;

export default memo(SearchContentItem);
